import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrtnmHHiBLHsXH1e6xWNZusX4LmZwj9TE",
  authDomain: "ptcian-choice.firebaseapp.com",
  projectId: "ptcian-choice",
  storageBucket: "ptcian-choice.firebasestorage.app",
  messagingSenderId: "227648071491",
  appId: "1:227648071491:web:e7bd38f87f88c4dce771f6",
  measurementId: "G-DEGMWCZF6W",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
