import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCduKQ1hWYpkqXXSgjUCQzxwDGS9CsIqJs",
  authDomain: "virtualizacion-52af6.firebaseapp.com",
  projectId: "virtualizacion-52af6",
  storageBucket: "virtualizacion-52af6.appspot.com",
  messagingSenderId: "968285854996",
  appId: "1:968285854996:web:115cf90f3b6989a452f601",
  measurementId: "G-GZFXMCBWKR",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
