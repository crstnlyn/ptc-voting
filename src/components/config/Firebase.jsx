import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAp6knvz7JrocABDdMxaVVSs9izGomS1M",
  authDomain: "ptc-voting-system.firebaseapp.com",
  projectId: "ptc-voting-system",
  storageBucket: "ptc-voting-system.firebasestorage.app",
  messagingSenderId: "525554985900",
  appId: "1:525554985900:web:e7e0e71a6b2dd719eea809",
  measurementId: "G-D37SKN9BSR",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
