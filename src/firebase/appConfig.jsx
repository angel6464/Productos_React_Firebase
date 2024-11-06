// Importamos las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBYpUnVgrLf2BHIt-6nAIIU9U7xx3wcYgM",
    authDomain: "productosreactkodigo.firebaseapp.com",
    projectId: "productosreactkodigo",
    storageBucket: "productosreactkodigo.appspot.com",  // Corregido a ".appspot.com"
    messagingSenderId: "330208190631",
    appId: "1:330208190631:web:8619a2b22dae6fc7e2bb82"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Agrupamos todo en un solo objeto
const firebaseServices = {
    db: getFirestore(app),
    auth: getAuth(app),
    provider: new GoogleAuthProvider(),
    signInWithGoogle: () => signInWithPopup(getAuth(app), new GoogleAuthProvider()),
    logout: () => signOut(getAuth(app)),
};

// Exportamos el objeto como default
export default firebaseServices;
