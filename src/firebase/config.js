// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyC308vsnSgh1n9aWdhRFiD51uPUDVw8eDA",
  authDomain: "tshop-23106.firebaseapp.com",
  projectId: "tshop-23106",
  storageBucket: "tshop-23106.appspot.com",
  messagingSenderId: "432487233170",
  appId: "1:432487233170:web:d369cba423df698026184b",
  measurementId: "G-ZN5W769F62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
