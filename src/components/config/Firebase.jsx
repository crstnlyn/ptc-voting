import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnFLrc3qynBLtCArA4g6aazWBJ1k3a2-c",
  authDomain: "voting-system-313e9.firebaseapp.com",
  projectId: "voting-system-313e9",
  storageBucket: "voting-system-313e9.firebasestorage.app",
  messagingSenderId: "601269247173",
  appId: "1:601269247173:web:1102bd2f5a9c7c7c9464ac",
  measurementId: "G-WG9E968BL3",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
