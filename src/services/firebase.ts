import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

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