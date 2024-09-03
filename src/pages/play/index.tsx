import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import './style.scss';
import { useAuth } from '../../hooks/useAuth';

export function Play() {
    const { user } = useAuth();
    const [unlockedOperations, setUnlockedOperations] = useState<{[key: string]: boolean}>({});

    useEffect(() => {
        const fetchUserProgress = async () => {
            if (user) {
                const db = getDatabase();
                const progressRef = ref(db, `users/${user.id}/progress`);
                const snapshot = await get(progressRef);

                if (snapshot.exists()) {
                    const progress = snapshot.val();
                    const unlocked: {[key: string]: boolean} = {};

                    // Lógica de desbloqueio das fases e operações
                    if (progress.addition?.facil) {
                        unlocked.subtraction = true; // Libera fase fácil da subtração
                    }
                    if (progress.addition?.dificil) {
                        unlocked.subtraction = true; // Libera fase fácil da subtração
                        unlocked.subtractionHard = true; // Libera fase difícil da subtração
                    }
                    if (progress.subtraction?.facil) {
                        unlocked.multiplication = true; // Libera fase fácil da multiplicação
                    }
                    if (progress.subtraction?.dificil) {
                        unlocked.multiplication = true; // Libera fase fácil da multiplicação
                        unlocked.multiplicationHard = true; // Libera fase difícil da multiplicação
                    }
                    if (progress.multiplication?.facil) {
                        unlocked.division = true; // Libera fase fácil da divisão
                    }
                    if (progress.multiplication?.dificil) {
                        unlocked.division = true; // Libera fase fácil da divisão
                        unlocked.divisionHard = true; // Libera fase difícil da divisão
                    }

                    setUnlockedOperations(unlocked);
                }
            }
        };
        fetchUserProgress();
    }, [user]);

    const isUnlocked = (operation: string, difficulty: 'easy' | 'hard') => {
        return unlockedOperations[`${operation}${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`] || (difficulty === 'easy' && unlockedOperations[operation]);
    };

    return (
        <div className='container-play'>
            <h1>ESCOLHA A OPERAÇÃO</h1>
            <ul>
                <Link to="addition">ADIÇÃO</Link>
                <Link to="subtraction" className={isUnlocked('subtraction', 'easy') ? '' : 'blocked'}>SUBTRAÇÃO</Link>
                <Link to="multiplication" className={isUnlocked('multiplication', 'easy') ? '' : 'blocked'}>MULTIPLICAÇÃO</Link>
                <Link to="division" className={isUnlocked('division', 'easy') ? '' : 'blocked'}>DIVISÃO</Link>
            </ul>
        </div>
    );
}
