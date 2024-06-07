import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsE9K6OXwXRBpD70Dszgwo8RLjk6NGBZ4",
  authDomain: "piwo-4.firebaseapp.com",
  projectId: "piwo-4",
  storageBucket: "piwo-4.appspot.com",
  messagingSenderId: "484597887118",
  appId: "1:484597887118:web:9917b20e22cb3cb04959df",
  measurementId: "G-H3M9TDH5GS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const loginWithGoogle = () => signInWithPopup(auth, provider);
const logout = () => signOut(auth);
const registerWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

export { auth, provider, loginWithGoogle, logout, registerWithEmail, loginWithEmail, db, collection, getDocs, doc, getDoc };