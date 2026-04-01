// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {signInWithPopup} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV_ZPT37PyaoiYnXJwms51mRcTSNrM2Tc",
  authDomain: "my-movie-app-7bf6a.firebaseapp.com",
  projectId: "my-movie-app-7bf6a",
  storageBucket: "my-movie-app-7bf6a.firebasestorage.app",
  messagingSenderId: "970339876505",
  appId: "1:970339876505:web:dc6a9fce2f13ab9f538208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export {auth, provider, db};