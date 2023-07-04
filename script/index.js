const divHerramientas = document.getElementById("container-herramientas");
const divInfoPersonal = document.getElementById("info-personal-div");

import arrayHerramientas from "../helpers/herramientas.js";
import estudiante from "../helpers/infoPersonal.js";

const cargarInfoPersonal = () => {
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

cargarInfoPersonal();
cargarHerramientas();
