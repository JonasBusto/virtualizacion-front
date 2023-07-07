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
  getDoc,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const navbarDiv = document.getElementById("navbar-contain");
const profile = document.getElementById("profile-contain");
let usuarioFirestore = null;

onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    usuarioFirestore = await getDoc(doc(db, "users", currentUser?.uid));
    console.log(currentUser);
    console.log(usuarioFirestore);
    navbarDiv.innerHTML = `
    <a href="/">Inicio</a>
      <a href="/pages/profile.html">Mi perfil</a>
    `;

    if (profile) {
      profile.innerHTML = `
      <div
      class="d-flex flex-column justify-content-center align-items-center w-100"
      >
      <p>Mi perfil</p>
      <img
      class="img-fluid"
      src="${currentUser.photoURL}"
      alt=""
      />
        <h6 class="mt-3">Email: ${currentUser.email}</h6>
        <h6>Nombre/Apellido: ${currentUser.displayName}</h6>
      <button id="logout">Cerrar sesión</button>
      </div>
      `;

      const btnLogout = document.getElementById("logout");
      btnLogout.addEventListener("click", () => {
        signOut(auth);
        window.location.href = "/";
      });
    }
  } else {
    navbarDiv.innerHTML = `
    <a href="/">Inicio</a>
      <a href="/pages/login.html">Autenticarse</a>
    `;
  }
});
