import { auth, db } from "./firebase.js";
import {
  getDoc,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const divHerramientas = document.getElementById("container-herramientas");
const divInfoPersonal = document.getElementById("info-personal-div");
const anchorHola = document.getElementById("hola-anchor");
const seccionComentarios = document.getElementById("comentarios-seccion");

import arrayHerramientas from "../helpers/herramientas.js";
import estudiante from "../helpers/infoPersonal.js";

const cargarInfoPersonal = () => {
  anchorHola.innerHTML = `
  <p>HOLA 👋🏻</p>
        <button
          type="button"
          class="btn-hola-custom"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <img
            class="img-fluid"
            src="https://drive.google.com/uc?export=view&id=1EemG9V23wiT_tado0MqbqQ8BoUY7vKFO"
            alt=""
          />
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <img
                  class="img-fluid"
                  src="https://drive.google.com/uc?export=view&id=1EemG9V23wiT_tado0MqbqQ8BoUY7vKFO"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
  `;

  divInfoPersonal.innerHTML = `
  <div class="d-flex flex-column info">
          <p>
            Me llamo <b>${estudiante.nombre_corto}</b>. Soy estudiante de
            <b>${estudiante.universidad.carrera_na}</b> en la <b>${
    estudiante.universidad.u_na
  }</b>.
          </p>
          <p class="mt-2">
            ${estudiante.descripcion_personal}
          </p>
        </div>
        <div class="d-flex mt-4">
          <div
            class="d-flex flex-column align-items-start p-title acerca w-100"
          >
            <p>Acerca de mi</p>
            <div class="container-list">
              <ul>
                <li>Mi nombre es ${estudiante.nombre_completo}</li>
                <li>Tengo ${estudiante.edad} años</li>
                <li>
                  Conocimientos en:
                  <i
                    >${estudiante.conocimientos.map((c) => " " + c)}</i
                  >
                </li>
                <li>
                  Estudiante de ${estudiante.universidad.carrera_nc}, en la ${
    estudiante.universidad.u_nc
  }
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="contacto-email">
          <p>Me puedes contactar por:</p>
          <p class="d-flex justify-content-end">
            📨
            <a href=${"mailto:" + estudiante.emails.institucional}
              >${estudiante.emails.institucional}</a
            >
          </p>
        </div>
  `;
};

const cargarHerramientas = () => {
  arrayHerramientas.map(
    (h) =>
      (divHerramientas.innerHTML += `
    <div class="d-flex container-item-blog">
    <img
        class="img-fluid"
        src=${h.img_logo}
        alt=""
    />

    <div class="d-flex flex-column">
        <p class="title-item d-flex align-items-center"><b class="me-2">${h.nombre}</b> (${h.info_extra})</p>
        <p class="info-item">
        ${h.descripcion}
        </p>
    </div>
    </div>
    `)
  );
};

const cargarComentarios = async () => {
  const q = query(collection(db, "comentarios"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length === 0) {
    seccionComentarios.innerHTML = `
    <p>No hay comentarios</p>
    `;
  } else {
    querySnapshot.forEach((doc) => {
      seccionComentarios.innerHTML += `
  <div class="d-flex border-comentarios">
              <div class="d-flex container-img-comentario">
                <img
                  class="img-fluid"
                  src="${doc.data().img_comentario}"
                  alt=""
                />
              </div>
              <div class="d-flex flex-column contain-info-comentario">
                <a href=${
                  "mailto:" + doc.data().email
                } class="nombre-comentario">${doc.data().nombre}</a>
                <p class="info-extra-comentario">${doc.data().fecha}</p>
                <p class="comentario-realizado">
                ${doc.data().texto_comentado}
                </p>
              </div>
            </div>
  `;
    });
  }
};

cargarInfoPersonal();
cargarHerramientas();
cargarComentarios();
