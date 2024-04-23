
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwjOqEsR0YD_HmJ00FRHp5mhjMWm2pA8E",
  authDomain: "mern-e-commerce-2024-7dfc9.firebaseapp.com",
  projectId: "mern-e-commerce-2024-7dfc9",
  storageBucket: "mern-e-commerce-2024-7dfc9.appspot.com",
  messagingSenderId: "707482741294",
  appId: "1:707482741294:web:c7f1ed5ff8fd7c98e30dbf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)

