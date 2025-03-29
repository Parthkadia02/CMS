// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR2JDurctaLu9Bw5xBVAcjtofLia9W16s",
  authDomain: "fir-auth-63a46.firebaseapp.com",
  projectId: "fir-auth-63a46",
  storageBucket: "fir-auth-63a46.firebasestorage.app",
  messagingSenderId: "910024071758",
  appId: "1:910024071758:web:103404fb04e2088ff0c11f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth }
export { db };