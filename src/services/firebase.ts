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
    apiKey: "AIzaSyDvjzI-8uH1p4hZx8Q0LPPpVMpcRC-r6os",
    authDomain: "matemagica-ff1bb.firebaseapp.com",
    databaseURL: "https://matemagica-ff1bb-default-rtdb.firebaseio.com/",
    projectId: "matemagica-ff1bb",
    storageBucket: "matemagica-ff1bb.appspot.com",
    messagingSenderId: "706535351747",
    appId: "1:706535351747:web:f681827be320c33664c976"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database }