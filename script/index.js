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
        <div> 
        <div class="modal-container">
          <button data-bs-toggle="modal" data-bs-target="#editarPresentacion">
            Editar
          </button>

          <div
            class="modal fade"
            id="editarPresentacion"
            tabindex="-1"
            aria-labelledby="editarPresentacionLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="modal-div-input">
                    <p>Modificar presentación</p>
                    <div class="container-form-presentacion d-flex flex-column">
                    <p>Email:</p>
                    <input type="text" placeholder="Nueva información" value=${
                      estudiante.emails.institucional
                    }/>
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Presentación:</p>
                    <textarea name="" id="" cols="30" rows="10">${
                      estudiante.presentacion
                    }</textarea>
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Url actual Imagen:</p>
                    <img
                      class="img-fluid"
                      src="${estudiante.foto_url}"
                      alt=""
                    />
                    <input type="text" value="${
                      estudiante.foto_url
                    }" placeholder="URL Imagen" />
                  </div>
                  </div>
                  <div class="d-flex justify-content-between btn-container-modal">
                    <button data-bs-dismiss="modal">Cancelar</button>
                    <button id="btn-editar-presentacion">Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
          <p class="mt-2">
            ${estudiante.presentacion}
          </p>
        </div>
        
        <div class="d-flex mt-4">
          <div
            class="d-flex flex-column align-items-start p-title acerca w-100"
          >
          <div class="acerca d-flex align-items-center">
            <p>Sobre mi</p>
            <div class="modal-container d-flex align-items-center">
          <button class="btn-e-sobre-mi" data-bs-toggle="modal" data-bs-target="#agregarSobreMi">
            (Editar)
          </button>

          <div
            class="modal fade"
            id="agregarSobreMi"
            tabindex="-1"
            aria-labelledby="agregarSobreMiLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="modal-div-input">
                    <p>Agregar algo sobre mi</p>
                    <textarea name="" id="textarea-sobre-mi-agregar" cols="30" rows="10"></textarea>
                  </div>
                  <div class="d-flex justify-content-between btn-container-modal">
                    <button data-bs-dismiss="modal">Cancelar</button>
                    <button id="btn-agregar-sobre-mi">Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
          </div>
            <div class="container-list">
              <ul>
                <li class="d-flex align-items-center">Mi nombre es ${
                  estudiante.nombre_completo
                }
                <div class="modal-container">
        <button data-bs-toggle="modal" data-bs-target="#borrarInfoSobreMi">
          (Borrar)
        </button>

        <div
          class="modal fade"
          id="borrarInfoSobreMi"
          tabindex="-1"
          aria-labelledby="borrarInfoSobreMiLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-div-input">
                  <p>Borrar esta información:</p>
                  <p class="p-borrar-sobre-mi">'Item a borrar'</p>
                </div>
                <div class="d-flex justify-content-between btn-container-modal">
                  <button data-bs-dismiss="modal">Cancelar</button>
                  <button>Borrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-container">
        <button data-bs-toggle="modal" data-bs-target="#modificarInfoSobreMi">
          (Editar)
        </button>

        <div
          class="modal fade"
          id="modificarInfoSobreMi"
          tabindex="-1"
          aria-labelledby="modificarInfoSobreMiLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-div-input">
                  <p>Modificar esta información:</p>
                  <textarea name="" id="textarea-sobre-mi-agregar" cols="30" rows="10"></textarea>
                </div>
                <div class="d-flex justify-content-between btn-container-modal">
                  <button data-bs-dismiss="modal">Cancelar</button>
                  <button>Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                
                </li>
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

  const inputSobreMiAgregar = document.getElementById(
    "textarea-sobre-mi-agregar"
  );

  const btnGuardarPresentacion = document.getElementById(
    "btn-editar-presentacion"
  );

  const btnAgregarSobreMi = document.getElementById("btn-agregar-sobre-mi");
  btnAgregarSobreMi.classList.add("btn-disabled");

  btnGuardarPresentacion.addEventListener("click", () => {
    console.log(presentacionEditada.value);
  });

  btnAgregarSobreMi.addEventListener("click", () => {
    console.log(inputSobreMiAgregar.value);
  });

  inputSobreMiAgregar.addEventListener("keyup", () => {
    if (inputSobreMiAgregar.value.trim() === "") {
      btnAgregarSobreMi.classList.add("btn-disabled");
    } else {
      btnAgregarSobreMi.classList.remove("btn-disabled");
    }
  });
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
