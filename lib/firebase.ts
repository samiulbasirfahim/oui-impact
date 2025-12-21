import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAERWqIXcSgsf12uhpqpxwYYEXpq22qslo",
    authDomain: "moumou-9c12e.firebaseapp.com",
    projectId: "moumou-9c12e",
    storageBucket: "moumou-9c12e.firebasestorage.app",
    messagingSenderId: "133922668414",
    appId: "1:133922668414:web:59181210e60eaea2fdbd2f",
    measurementId: "G-J7LGECYPT5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
