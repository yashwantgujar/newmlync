
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, browserLocalPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF-th4AvB6oGGyVA0Uot90fO8iI9xB4Lc",
  authDomain: "teting-f689e.firebaseapp.com",
  projectId: "teting-f689e",
  storageBucket: "teting-f689e.firebasestorage.app",
  messagingSenderId: "96623631983",
  appId: "1:96623631983:web:d54bbff7c4fc7325bf779a",
  measurementId: "G-P7TGQKTLXM"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

if (typeof window !== "undefined") {
    setPersistence(auth, browserLocalPersistence);
}

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };