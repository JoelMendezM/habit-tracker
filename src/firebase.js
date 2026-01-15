import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH3PFJF_WPsqPo4EitGM5zQkiaNdiAz78",
  authDomain: "habit-tracker-e04b5.firebaseapp.com",
  projectId: "habit-tracker-e04b5",
  storageBucket: "habit-tracker-e04b5.firebasestorage.app",
  messagingSenderId: "354570785038",
  appId: "1:354570785038:web:d7e671bd0f7cd464d1875f"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);