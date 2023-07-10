import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const btnLoginGoogle = document.getElementById("btn-login-google");

const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider)
    .then(async (currentUser) => {
      await setDoc(doc(db, "users", currentUser.user.uid), {
        email: currentUser.user.email,
        rol: "user",
      });
      window.location.href = "/";
    })
    .catch((error) => console.log("google error: ", error));
};

btnLoginGoogle.addEventListener("click", loginWithGoogle);