// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8eehRt9wRp9NWpBucHfKUYSoD1wKllYY",
  authDomain: "clone-c59fb.firebaseapp.com",
  projectId: "clone-c59fb",
  storageBucket: "clone-c59fb.firebasestorage.app",
  messagingSenderId: "104645157811",
  appId: "1:104645157811:web:34a8ccead3af8a151da1c6",
  measurementId: "G-2YZHQTEPEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();