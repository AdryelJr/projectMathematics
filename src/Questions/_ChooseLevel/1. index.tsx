import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import { useAuth } from '../../hooks/useAuth';
import './style.scss';

interface ChooseLevelProps {
    onLevelSelect: (level: string) => void;
    operacao: string;
}

const ChooseLevel: React.FC<ChooseLevelProps> = ({ onLevelSelect, operacao }) => {
    const { user } = useAuth();
    const [bloquear, setBloquear] = useState(true);

    useEffect(() => {
        if (user) {
            const db = getDatabase();

            // Lógica para verificar as condições
            const checkProgress = async () => {
                const additionRef = ref(db, `users/${user.id}/progress/addition`);
                const subtractionRef = ref(db, `users/${user.id}/progress/subtraction`);
                const multiplicationRef = ref(db, `users/${user.id}/progress/multiplication`);

                const additionSnapshot = await get(additionRef);
                const subtractionSnapshot = await get(subtractionRef);
                const multiplicationSnapshot = await get(multiplicationRef);

                const additionProgress = additionSnapshot.val();
                const subtractionProgress = subtractionSnapshot.val();
                const multiplicationProgress = multiplicationSnapshot.val();
                console.log(additionProgress.dificil, operacao)

                if (operacao === "addition") {
                    setBloquear(false); // Addition está sempre liberado
                } else if (operacao === "subtraction" && additionProgress.dificil) {
                    setBloquear(false); // Subtraction liberado se Addition difícil concluído
                } else if (operacao === "multiplication" && subtractionProgress.dificil) {
                    setBloquear(false); // Multiplication liberado se Subtraction difícil concluído
                } else if (operacao === "division" && multiplicationProgress.dificil) {
                    setBloquear(false); // Division liberado se Multiplication difícil concluído
                } else {
                    setBloquear(true); // Caso contrário, bloquear
                }
            };

            checkProgress().catch((error) => {
                console.error("Erro ao verificar o progresso:", error);
            });
        }
    }, [user, operacao]);

    return (
        <div className='container-chooseLevel'>
            <h2>ESCOLHA O NÍVEL DE DIFICULDADE</h2>
            <button onClick={() => onLevelSelect('easy')}>FÁCIL</button>
            <button className={bloquear ? 'blocked' : ''} onClick={() => onLevelSelect('hard')} disabled={bloquear}> DIFÍCIL</button>
        </div>
    );
};

export default ChooseLevel;
