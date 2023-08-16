import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {
  getDoc,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const navbarDiv = document.getElementById("navbar-contain");
const profile = document.getElementById("profile-contain");
const formComentarios = document.getElementById("form-comentarios");
let usuarioFirestore = null;

onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    usuarioFirestore = await getDoc(doc(db, "users", currentUser?.uid));
    // console.log(currentUser);
    // console.log(usuarioFirestore);
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

    if (formComentarios) {
      formComentarios.innerHTML = `
      <textarea
        class="w-100"
        name=""
        id="textarea-comentario"
        cols="30"
        rows="10"
      ></textarea>
      <div class="d-flex justify-content-end btn-comentar">
        <button id="btn-realizar-comentario">Comentar</button>
      </div>
      `;

      const btnComentar = document.getElementById("btn-realizar-comentario");
      btnComentar.classList.add("btn-disabled");
      const textareaComentario = document.getElementById("textarea-comentario");

      textareaComentario.addEventListener("keyup", () => {
        if (textareaComentario.value.trim() === "") {
          btnComentar.classList.add("btn-disabled");
        } else {
          btnComentar.classList.remove("btn-disabled");
        }
      });

      btnComentar.addEventListener("click", () =>
        comentar(textareaComentario, btnComentar)
      );
    }
  } else {
    navbarDiv.innerHTML = `
    <a href="/">Inicio</a>
    <a href="/">Inicio 2</a>
      <a href="/pages/login.html">Autenticarse</a> 
    `;

    if (formComentarios) {
      formComentarios.innerHTML = `
        <p class="alerta-comentario-sesion">
          *Debe iniciar sesión para comentar*
        </p>
      `;
    }
  }
});

const comentar = (textareaComentario, btnComentar) => {
  onAuthStateChanged(auth, async (currentUser) => {
    const date = new Date();
    btnComentar.classList.add("btn-disabled");
    btnComentar.innerHTML = "Cargando";
    const comentario = {
      id: "comentario-1",
      id_perfil: currentUser.uid,
      nombre: currentUser.displayName,
      email: currentUser.email,
      img_comentario: currentUser.photoURL,
      texto_comentado: textareaComentario.value,
      fecha: date.toLocaleString(),
    };

    await setDoc(
      doc(db, "comentarios", currentUser.uid + "-" + Date.now()),
      comentario
    ).then(() => window.location.reload());
  });
};
