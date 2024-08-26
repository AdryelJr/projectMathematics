import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, update } from "firebase/database";
import { ref } from "firebase/database";

export async function updateUserProgress(userId: string, operation: string, level: 'facil' | 'dificil') {
    const db = getDatabase();
    const progressRef = ref(db, `users/${userId}/progress/${operation}`);
    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
        const progress = snapshot.val();
        const updatedProgress = { ...progress, [level]: true };

        const allLevelsCompleted = updatedProgress.facil && updatedProgress.dificil;
        if (allLevelsCompleted) {
            updatedProgress.concluido = true;
        }

        await update(progressRef, updatedProgress);

        if (allLevelsCompleted) {
            const nextOperation = getNextOperation(operation);
            if (nextOperation) {
                const nextOperationRef = ref(db, `users/${userId}/progress/${nextOperation}`);
                const nextOperationSnapshot = await get(nextOperationRef);

                if (!nextOperationSnapshot.exists()) {
                    const initialProgress = { facil: false, dificil: false, concluido: false };
                    await update(nextOperationRef, initialProgress);
                }
            }
        }
    } else {
        console.error('Operação não encontrada para o usuário:', operation);
    }
}

function getNextOperation(currentOperation: string): string | null {
    const operations = ['addition', 'subtraction', 'multiplication', 'division'];
    const index = operations.indexOf(currentOperation);
    return index < operations.length - 1 ? operations[index + 1] : null;
}

const firebaseConfig = {
    apiKey: "AIzaSyCCvZmFrvJyPLM8gKrzoY99EB_k9MgoC0E",
    authDomain: "mathproject-3bc2d.firebaseapp.com",
    projectId: "mathproject-3bc2d",
    storageBucket: "mathproject-3bc2d.appspot.com",
    messagingSenderId: "427048207848",
    appId: "1:427048207848:web:00bae2285257a0b9e5d05d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database }