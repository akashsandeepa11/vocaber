import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKPx__SF1geuDQuItKVUnbwVxNyMbAhxE",
  authDomain: "vocaber-b3186.firebaseapp.com",
  projectId: "vocaber-b3186",
  storageBucket: "vocaber-b3186.appspot.com",
  messagingSenderId: "915491595199",
  appId: "1:915491595199:web:d1681af7bdd9db06fbb70a",
  measurementId: "G-02V31DF99G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
