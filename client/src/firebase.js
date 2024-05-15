// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-mern-597d3.firebaseapp.com",
  projectId: "estate-mern-597d3",
  storageBucket: "estate-mern-597d3.appspot.com",
  messagingSenderId: "875421737363",
  appId: "1:875421737363:web:4ff8fa72b9f31b19504866"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);