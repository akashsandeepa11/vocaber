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

// 492396333231-lub56j4h97g59cov63afuugtsvitdngq.apps.googleusercontent.com

// {"installed":{"client_id":"492396333231-5l3mv310curimmfluss3hl89pob1lcls.apps.googleusercontent.com","project_id":"vocaber-402106","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs"}}
