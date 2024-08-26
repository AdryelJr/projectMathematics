import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import './style.scss';
import { useAuth } from '../../hooks/useAuth';

export function Play() {
    const { user } = useAuth();
    const [unlockedOperations, setUnlockedOperations] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserProgress = async () => {
            if (user) {
                const db = getDatabase();
                const progressRef = ref(db, `users/${user.id}/progress`);
                const snapshot = await get(progressRef);

                if (snapshot.exists()) {
                    const progress = snapshot.val();
                    const unlocked: string[] = [];

                    const operations = ['addition', 'subtraction', 'multiplication', 'division'];
                    for (const op of operations) {
                        if (op === 'addition') {
                            unlocked.push(op);
                        } else {
                            const previousOperation = operations[operations.indexOf(op) - 1];
                            if (progress[previousOperation]?.concluido) {
                                unlocked.push(op);
                            }
                        }
                    }
                    setUnlockedOperations(unlocked);
                }
            }
        };
        fetchUserProgress();
    }, [user]);


    const isUnlocked = (operation: string) => unlockedOperations.includes(operation);

    return (
        <div className='container-play'>
            <h1>ESCOLHA A OPERAÇÃO</h1>
            <ul>
                <Link to="addition">ADIÇÃO</Link>
                <Link to="subtraction" className={isUnlocked('subtraction') ? '' : 'blocked'}>SUBTRAÇÃO</Link>
                <Link to="multiplication" className={isUnlocked('multiplication') ? '' : 'blocked'}>MULTIPLICAÇÃO</Link>
                <Link to="division" className={isUnlocked('division') ? '' : 'blocked'}>DIVISÃO</Link>
            </ul>
        </div>
    );
}
