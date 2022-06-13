import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgs-crtKbWdigYxMBqpOawZejoyuMKb3g",
  authDomain: "uganto-4d969.firebaseapp.com",
  projectId: "uganto-4d969",
  storageBucket: "uganto-4d969.appspot.com",
  messagingSenderId: "623043727132",
  appId: "1:623043727132:web:3c0cdea636c51d1fe874d9",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
