// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5ZBQWFaCR-iphsrH8plv2gLcRsgIel7U",
  authDomain: "arcadeworld-507c9.firebaseapp.com",
  projectId: "arcadeworld-507c9",
  storageBucket: "arcadeworld-507c9.appspot.com",
  messagingSenderId: "985581103169",
  appId: "1:985581103169:web:0a6760d19b4af8a2f7fec0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const  auth = getAuth(app)