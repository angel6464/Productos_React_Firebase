// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYpUnVgrLf2BHIt-6nAIIU9U7xx3wcYgM",
    authDomain: "productosreactkodigo.firebaseapp.com",
    projectId: "productosreactkodigo",
    storageBucket: "productosreactkodigo.firebasestorage.app",
    messagingSenderId: "330208190631",
    appId: "1:330208190631:web:8619a2b22dae6fc7e2bb82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//creamos una constante que nos va ayudar a conectarnos a la bd de firebase
const db = getFirestore(app)
export default db