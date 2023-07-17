import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import {
  getDoc,
  doc,
  collection,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const divHerramientas = document.getElementById("container-herramientas");
const divInfoPersonal = document.getElementById("info-personal-div");
const anchorHola = document.getElementById("hola-anchor");
const seccionComentarios = document.getElementById("comentarios-seccion");
let arrayHerramientasMySQL = [];
let estudianteMySQL = {};
let arraySobreMiMySQL = [];
let usuarioFirestore = null;

import arrayHerramientas from "../helpers/herramientas.js";
import estudiante from "../helpers/infoPersonal.js";

onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    usuarioFirestore = await getDoc(doc(db, "users", currentUser?.uid));
  }
  getMySQL();
});

const getMySQL = () => {
  fetch("https://virtualizacion-back-production.up.railway.app/sobreMi")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      arraySobreMiMySQL = data;
      fetch(
        "https://virtualizacion-back-production.up.railway.app/estudiante/1"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          estudianteMySQL = data;
          cargarInfoPersonal();
        })
        .catch((error) => console.log("error-estudiante: ", error));
    })
    .catch((error) => console.log("error-sobre-mi: ", error));

  fetch("https://virtualizacion-back-production.up.railway.app/herramientas")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      arrayHerramientasMySQL = data;
      cargarHerramientas();
    })
    .catch((error) => console.log("error-herramientas: ", error));
};

const modificarDatosEstudiante = (objetoEstudiante) => {
  fetch(
    `https://virtualizacion-back-production.up.railway.app/modificarEstudiante/${1}`,
    {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: objetoEstudiante.email,
        presentacion: objetoEstudiante.presentacion,
        url_img_perfil: objetoEstudiante.url_img_perfil,
      }),
    }
  ).then(() => {
    alert("Estudiante modifcado");
    window.location.reload();
  });
};

const agregarAlgoSobreMi = (nuevaInfo) => {
  fetch(
    "https://virtualizacion-back-production.up.railway.app/agregarAlgoSobreMi",
    {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        descripcion: nuevaInfo,
      }),
    }
  ).then(() => {
    alert("Información agregada");
    window.location.reload();
  });
};

const editarAlgoSobreMi = (id, descripcion) => {
  fetch(
    `https://virtualizacion-back-production.up.railway.app/modificarsobreMi/${id}`,
    {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        descripcion: descripcion,
      }),
    }
  ).then(() => {
    alert("Información modificada");
    window.location.reload();
  });
};

const eliminarAlgoSobreMi = (id) => {
  fetch(
    `https://virtualizacion-back-production.up.railway.app/eliminarAlgoSobreMi/${id}`,
    {
      method: "DELETE",
    }
  ).then(() => {
    alert("Información eliminada");
    window.location.reload();
  });
};

const agregarHerramienta = (herramienta) => {
  fetch(
    "https://virtualizacion-back-production.up.railway.app/agregarHerramienta",
    {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        nombre: herramienta.nombre,
        info_extra: herramienta.info_extra,
        img_logo: herramienta.img_logo,
        descripcion: herramienta.descripcion,
        url: herramienta.url,
      }),
    }
  ).then(() => {
    alert("Herramienta agregada");
    window.location.reload();
  });
};

const modificarHerramienta = (herramienta) => {
  fetch(
    `https://virtualizacion-back-production.up.railway.app/modificarHerramienta/${herramienta.id}`,
    {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        nombre: herramienta.nombre,
        info_extra: herramienta.info_extra,
        img_logo: herramienta.img_logo,
        descripcion: herramienta.descripcion,
        url: herramienta.url,
      }),
    }
  ).then(() => {
    alert("Herramienta agregada");
    window.location.reload();
  });
};

const eliminarHerramienta = (id) => {
  fetch(
    `https://virtualizacion-back-production.up.railway.app/eliminarHerramienta/${id}`,
    {
      method: "DELETE",
    }
  ).then(() => {
    alert("Herramienta eliminada");
    window.location.reload();
  });
};

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
            src="${estudianteMySQL.url_img_perfil}"
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
                  src="${estudianteMySQL.url_img_perfil}"
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
        <div class="modal-container" id="modal-inyect">  
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
                    <input type="text" id="input-email-modificar" placeholder="Nueva información" value="${
                      estudianteMySQL.email
                    }" />
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Presentación:</p>
                    <textarea name="" id="textarea-presentacion-modificar" cols="30" rows="10">"${
                      estudianteMySQL.presentacion
                    }"</textarea>
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Url actual Imagen:</p>
                    <img
                      class="img-fluid"
                      src="${estudianteMySQL.url_img_perfil}"
                      alt=""
                    />
                    <input type="text" id="input-url-imagen-modificar" value="${
                      estudianteMySQL.url_img_perfil
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
            ${estudianteMySQL.presentacion}
          </p>
        </div>
        
        <div class="d-flex mt-4">
          <div
            class="d-flex flex-column align-items-start p-title acerca w-100"
          >
          <div class="acerca d-flex align-items-center">
            <p>Sobre mi</p>
            <div class="modal-container d-flex align-items-center" id="modal-container-inyectar">
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
              <ul id="lista-sobre-mi">
              </ul>
            </div>
          </div>
        </div>
        <div class="contacto-email">
          
          <p>Me puedes contactar por:</p>
          
          <p class="d-flex justify-content-end">
            📨
            <a href=${"mailto:" + estudianteMySQL.email}
              >${estudianteMySQL.email}</a
            >
          </p>
          
        </div>
  `;

  // CARGAR INFORMACIÓN SOBRE MI

  const listaSobreMi = document.getElementById("lista-sobre-mi");

  for (let i = 0; i < arraySobreMiMySQL.length; i++) {
    const li = document.createElement("li");
    li.classList.add("d-flex", "align-items-center");

    li.innerHTML = `
    
    ✅ ${arraySobreMiMySQL[i].descripcion}
    <div class="modal-container" id=${
      "modal-container-secondary" + arraySobreMiMySQL[i].idSobreMi
    }>
    

    <div
    class="modal fade"
    id=${"borrarInfoSobreMi" + arraySobreMiMySQL[i].idSobreMi}
    tabindex="-1"
    aria-labelledby=${"borrarInfoSobreMiLabel" + arraySobreMiMySQL[i].idSobreMi}
    aria-hidden="true"
    >
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-div-input">
          <p>Borrar esta información:</p>
          <p class="p-borrar-sobre-mi">'${arraySobreMiMySQL[i].descripcion}'</p>
        </div>
        <div class="d-flex justify-content-between btn-container-modal">
          <button data-bs-dismiss="modal">Cancelar</button>
          <button id=${
            "btn-eliminar-sobre-mi" + arraySobreMiMySQL[i].idSobreMi
          }>Borrar</button>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    <div class="modal-container" id=${
      "modal-container-tertiary" + arraySobreMiMySQL[i].idSobreMi
    }>
    

    <div
    class="modal fade"
    id=${"modificarInfoSobreMi" + arraySobreMiMySQL[i].idSobreMi}
    tabindex="-1"
    aria-labelledby=${
      "modificarInfoSobreMiLabel" + arraySobreMiMySQL[i].idSobreMi
    }
    aria-hidden="true"
    >
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
        <div class="modal-div-input">
          <p>Modificar esta información:</p>
          <textarea name="" id=${
            "textarea-sobre-mi-modificar" + arraySobreMiMySQL[i].idSobreMi
          } cols="30" rows="10">"${arraySobreMiMySQL[i].descripcion}"</textarea>
        </div>
        <div class="d-flex justify-content-between btn-container-modal">
          <button data-bs-dismiss="modal">Cancelar</button>
          <button id=${
            "btn-modificar-algo-sobre-mi" + arraySobreMiMySQL[i].idSobreMi
          }>Guardar</button>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    `;

    listaSobreMi.appendChild(li);

    const textareaSobreMiModificar = document.getElementById(
      "textarea-sobre-mi-modificar" + arraySobreMiMySQL[i].idSobreMi
    );

    const btnEliminarAlgoSobreMi = document.getElementById(
      "btn-eliminar-sobre-mi" + arraySobreMiMySQL[i].idSobreMi
    );
    const btnModificarAlgoSobreMi = document.getElementById(
      "btn-modificar-algo-sobre-mi" + arraySobreMiMySQL[i].idSobreMi
    );

    btnEliminarAlgoSobreMi.addEventListener("click", () =>
      eliminarAlgoSobreMi(arraySobreMiMySQL[i].idSobreMi)
    );
    btnModificarAlgoSobreMi.addEventListener("click", () =>
      editarAlgoSobreMi(
        arraySobreMiMySQL[i].idSobreMi,
        textareaSobreMiModificar.value.trim()
      )
    );

    if (usuarioFirestore !== null) {
      if (usuarioFirestore.data().rol === "admin") {
        const modalContainerSecondary = document.getElementById(
          "modal-container-secondary" + arraySobreMiMySQL[i].idSobreMi
        );
        const modalContainerTertiary = document.getElementById(
          "modal-container-tertiary" + arraySobreMiMySQL[i].idSobreMi
        );

        modalContainerSecondary.innerHTML += `
      <button data-bs-toggle="modal" data-bs-target=${
        "#borrarInfoSobreMi" + arraySobreMiMySQL[i].idSobreMi
      }>
        <i class="fa-solid fa-trash"></i>
      </button>
      `;

        modalContainerTertiary.innerHTML += `
      <button data-bs-toggle="modal" data-bs-target=${
        "#modificarInfoSobreMi" + arraySobreMiMySQL[i].idSobreMi
      }>
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      `;
      }
    }
  }

  if (usuarioFirestore !== null) {
    if (usuarioFirestore.data().rol === "admin") {
      const modalInyectar = document.getElementById("modal-inyect");
      const modalContainerInyectar = document.getElementById(
        "modal-container-inyectar"
      );

      modalInyectar.innerHTML += `
      <button data-bs-toggle="modal" data-bs-target="#editarPresentacion">
        <i class="fa-solid fa-user-pen"></i>
      </button>
      `;

      modalContainerInyectar.innerHTML += `
      <button class="btn-e-sobre-mi" data-bs-toggle="modal" data-bs-target="#agregarSobreMi">
        <i class="fa-solid fa-plus"></i>
      </button>
      `;
    }
  }

  // VALIDAR PRESENTACIÓN

  const inputEmailModificar = document.getElementById("input-email-modificar");
  const textareaPresentacionModificar = document.getElementById(
    "textarea-presentacion-modificar"
  );
  const inputURLImagenModificar = document.getElementById(
    "input-url-imagen-modificar"
  );

  const btnModificarPresentacion = document.getElementById(
    "btn-editar-presentacion"
  );

  inputEmailModificar.addEventListener("keyup", () => {
    if (
      inputEmailModificar.value.trim() === "" ||
      textareaPresentacionModificar.value.trim() === "" ||
      inputURLImagenModificar.value.trim() === ""
    ) {
      btnModificarPresentacion.classList.add("btn-disabled");
    } else {
      btnModificarPresentacion.classList.remove("btn-disabled");
    }
  });
  textareaPresentacionModificar.addEventListener("keyup", () => {
    if (
      inputEmailModificar.value.trim() === "" ||
      textareaPresentacionModificar.value.trim() === "" ||
      inputURLImagenModificar.value.trim() === ""
    ) {
      btnModificarPresentacion.classList.add("btn-disabled");
    } else {
      btnModificarPresentacion.classList.remove("btn-disabled");
    }
  });
  inputURLImagenModificar.addEventListener("keyup", () => {
    if (
      inputEmailModificar.value.trim() === "" ||
      textareaPresentacionModificar.value.trim() === "" ||
      inputURLImagenModificar.value.trim() === ""
    ) {
      btnModificarPresentacion.classList.add("btn-disabled");
    } else {
      btnModificarPresentacion.classList.remove("btn-disabled");
    }
  });

  btnModificarPresentacion.addEventListener("click", () => {
    let objetoEstudiante = {
      email: inputEmailModificar.value.trim(),
      presentacion: textareaPresentacionModificar.value.trim(),
      url_img_perfil: inputURLImagenModificar.value.trim(),
    };

    modificarDatosEstudiante(objetoEstudiante);
  });

  //VALIDAR SOBRE MI

  const inputSobreMiAgregar = document.getElementById(
    "textarea-sobre-mi-agregar"
  );

  const btnAgregarSobreMi = document.getElementById("btn-agregar-sobre-mi");
  btnAgregarSobreMi.classList.add("btn-disabled");

  inputSobreMiAgregar.addEventListener("keyup", () => {
    if (inputSobreMiAgregar.value.trim() === "") {
      btnAgregarSobreMi.classList.add("btn-disabled");
    } else {
      btnAgregarSobreMi.classList.remove("btn-disabled");
    }
  });

  btnAgregarSobreMi.addEventListener("click", () => {
    agregarAlgoSobreMi(inputSobreMiAgregar.value.trim());
  });
};

const cargarHerramientas = () => {
  divHerramientas.innerHTML = `
  <div class="d-flex align-items-center acerca">
  <p>Herramientas
  </p>
    <div class="modal-container" id="modal-container-n-h">

        
      </div> 
  </div>
  `;

  if (usuarioFirestore !== null) {
    if (usuarioFirestore.data().rol === "admin") {
      const divModalContainerNH = document.getElementById(
        "modal-container-n-h"
      );

      divModalContainerNH.innerHTML = `
      <button data-bs-toggle="modal" data-bs-target="#nuevaHerramienta">
        <i class="fa-solid fa-plus"></i>
      </button>

      <div
          class="modal fade"
          id="nuevaHerramienta"
          tabindex="-1"
          aria-labelledby="nuevaHerramientaLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div class="modal-div-input">
                  <p>Nueva herramienta</p>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Nombre:</p>
                    <input type="text" id="input-nombre-h" placeholder="Nombre" />
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Información extra (Opcional):</p>
                    <input type="text" id="input-info-extra-h" placeholder="Info extra. Ej: Versión actual, etc" />
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Url Logo:</p>
                    <input type="text" id="input-url-logo-h" placeholder="URL Logo" />
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Descripción:</p>
                    <textarea name="" id="textarea-descripcion-h" cols="30" rows="10"></textarea>
                  </div>
                  <div class="container-form-presentacion d-flex flex-column">
                    <p>Url de la pagina de la herramienta (Opcional):</p>
                    <input type="text" id="input-url-pagina-h" placeholder="URL Pagina" />
                  </div>
                </div>
                <div class="d-flex justify-content-between btn-container-modal">
                  <button data-bs-dismiss="modal">Cancelar</button>
                  <button id="btn-agregar-herramienta">Agregar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const inputNombreHerramienta = document.getElementById("input-nombre-h");
      const inputInfoExtraHerramienta =
        document.getElementById("input-info-extra-h");
      const inputUrlLogoHerramienta =
        document.getElementById("input-url-logo-h");
      const textareaDescripcionHerramienta = document.getElementById(
        "textarea-descripcion-h"
      );
      const inputUrlPaginaHerramienta =
        document.getElementById("input-url-pagina-h");
      const btnAgregarHerramienta = document.getElementById(
        "btn-agregar-herramienta"
      );
      btnAgregarHerramienta.classList.add("btn-disabled");

      inputNombreHerramienta.addEventListener("keyup", () => {
        if (
          inputNombreHerramienta.value.trim() === "" ||
          inputUrlLogoHerramienta.value.trim() === "" ||
          textareaDescripcionHerramienta.value.trim() === ""
        ) {
          btnAgregarHerramienta.classList.add("btn-disabled");
        } else {
          btnAgregarHerramienta.classList.remove("btn-disabled");
        }
      });
      inputUrlLogoHerramienta.addEventListener("keyup", () => {
        if (
          inputNombreHerramienta.value.trim() === "" ||
          inputUrlLogoHerramienta.value.trim() === "" ||
          textareaDescripcionHerramienta.value.trim() === ""
        ) {
          btnAgregarHerramienta.classList.add("btn-disabled");
        } else {
          btnAgregarHerramienta.classList.remove("btn-disabled");
        }
      });
      textareaDescripcionHerramienta.addEventListener("keyup", () => {
        if (
          inputNombreHerramienta.value.trim() === "" ||
          inputUrlLogoHerramienta.value.trim() === "" ||
          textareaDescripcionHerramienta.value.trim() === ""
        ) {
          btnAgregarHerramienta.classList.add("btn-disabled");
        } else {
          btnAgregarHerramienta.classList.remove("btn-disabled");
        }
      });

      btnAgregarHerramienta.addEventListener("click", () => {
        let auxInfoExtra = null;
        let auxUrlPagina = null;
        if (inputInfoExtraHerramienta.value.trim() !== "") {
          auxInfoExtra = inputInfoExtraHerramienta.value.trim();
        }
        if (inputUrlPaginaHerramienta.value.trim() !== "") {
          auxUrlPagina = inputUrlPaginaHerramienta.value.trim();
        }

        const objetoHerramienta = {
          nombre: inputNombreHerramienta.value.trim(),
          info_extra: auxInfoExtra,
          img_logo: inputUrlLogoHerramienta.value.trim(),
          descripcion: textareaDescripcionHerramienta.value.trim(),
          url: auxUrlPagina,
        };

        agregarHerramienta(objetoHerramienta);
      });
    }
  }

  for (let i = 0; i < arrayHerramientasMySQL.length; i++) {
    const div = document.createElement("div");
    div.classList.add("d-flex", "container-item-blog");

    if (arrayHerramientasMySQL[i].url === null) {
      div.innerHTML = `
      
      <img
      class="img-fluid"
      src=${arrayHerramientasMySQL[i].img_logo}
      alt=""
      />
      
      <div class="d-flex flex-column" >
      <p class="title-item d-flex align-items-center"><b class="me-2">${
        arrayHerramientasMySQL[i].nombre
      }</b> (${arrayHerramientasMySQL[i].info_extra})</p>
      <p class="info-item">
      ${arrayHerramientasMySQL[i].descripcion}
      </p>
      <div class="d-flex" id=${"container-h" + arrayHerramientasMySQL[i].id}>
      
      </div>
      </div>
      `;
    } else {
      div.innerHTML = `
      
      <img
      class="img-fluid"
      src=${arrayHerramientasMySQL[i].img_logo}
      alt=""
      />
      
      <div class="d-flex flex-column">
      <a href="${
        arrayHerramientasMySQL[i].url
      }" target="_blank" class="anchor-herramienta-url">
      <p class="title-item d-flex align-items-center"><b class="me-2">${
        arrayHerramientasMySQL[i].nombre
      }</b> (${arrayHerramientasMySQL[i].info_extra})</p>
      </a>
      <p class="info-item">
      ${arrayHerramientasMySQL[i].descripcion}
      </p>
      <div class="d-flex" id=${"container-h" + arrayHerramientasMySQL[i].id}>
      
      </div>
      </div>
      `;
    }

    divHerramientas.appendChild(div);

    if (usuarioFirestore !== null) {
      if (usuarioFirestore.data().rol === "admin") {
        const containerHerramienta = document.getElementById(
          "container-h" + arrayHerramientasMySQL[i].id
        );

        containerHerramienta.innerHTML = `
        <div class="modal-container">
          <button data-bs-toggle="modal" data-bs-target=${
            "#editarHerramienta" + arrayHerramientasMySQL[i].id
          }>
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
    
          <div
            class="modal fade"
            id=${"editarHerramienta" + arrayHerramientasMySQL[i].id}
            tabindex="-1"
            aria-labelledby=${
              "editarHerramientaLabel" + arrayHerramientasMySQL[i].id
            }
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                <div class="modal-div-input">
                <p>Modificar herramienta</p>
                <div class="container-form-presentacion d-flex flex-column">
                  <p>Nombre:</p>
                  <input type="text" id=${
                    "input-nombre-h-m" + arrayHerramientasMySQL[i].id
                  } 
                  value="${arrayHerramientasMySQL[i].nombre}"
                  placeholder="Nombre" />
                </div>
                <div class="container-form-presentacion d-flex flex-column">
                  <p>Información extra (Opcional):</p>
                  <input type="text" id=${
                    "input-info-extra-h-m" + arrayHerramientasMySQL[i].id
                  } value="${
          arrayHerramientasMySQL[i].info_extra
        }" placeholder="Info extra. Ej: Versión actual, etc" />
                </div>
                <div class="container-form-presentacion d-flex flex-column">
                  <p>Url Logo:</p>
                  <img
                    class="img-fluid mx-auto my-2"
                    src="${arrayHerramientasMySQL[i].img_logo}"
                    alt=""
                  />
                  <input type="text" id=${
                    "input-url-logo-h-m" + arrayHerramientasMySQL[i].id
                  } value="${
          arrayHerramientasMySQL[i].img_logo
        }" placeholder="URL Logo" />
                </div>
                <div class="container-form-presentacion d-flex flex-column">
                  <p>Descripción:</p>
                  <textarea name="" id=${
                    "textarea-descripcion-h-m" + arrayHerramientasMySQL[i].id
                  } cols="30" rows="10">${
          arrayHerramientasMySQL[i].descripcion
        }</textarea>
                </div>
                <div class="container-form-presentacion d-flex flex-column">
                  <p>Url de la pagina de la herramienta (Opcional):</p>
                  <input type="text" id=${
                    "input-url-pagina-h-m" + arrayHerramientasMySQL[i].id
                  } value="${
          arrayHerramientasMySQL[i].url === null
            ? ""
            : arrayHerramientasMySQL[i].url
        }" placeholder="URL Pagina" />
                </div>
              </div>
                  <div class="d-flex justify-content-between btn-container-modal">
                    <button data-bs-dismiss="modal">Cancelar</button>
                    <button id="${
                      "btn-modificar-h" + arrayHerramientasMySQL[i].id
                    }">Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

       
        <div class="modal-container">
          <button data-bs-toggle="modal" data-bs-target=${
            "#borrarHerramienta" + arrayHerramientasMySQL[i].id
          }>
            <i class="fa-solid fa-trash"></i>
          </button>
    
          <div
            class="modal fade"
            id=${"borrarHerramienta" + arrayHerramientasMySQL[i].id}
            tabindex="-1"
            aria-labelledby=${
              "borrarHerramientaLabel" + arrayHerramientasMySQL[i].id
            }
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                <div class="modal-div-input">
                  <p>Borrar herramienta: '${
                    arrayHerramientasMySQL[i].nombre
                  }'</p>
                  <img
                    class="img-fluid mx-auto my-2"
                    src="${arrayHerramientasMySQL[i].img_logo}"
                    alt=""
                  />
                  <div class="d-flex justify-content-between btn-container-modal">
                    <button data-bs-dismiss="modal">Cancelar</button>
                    <button id=${
                      "btn-borrar-h" + arrayHerramientasMySQL[i].id
                    }>Borrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;

        const inputModNombreH = document.getElementById(
          "input-nombre-h-m" + arrayHerramientasMySQL[i].id
        );
        const inputModInfoExtraHerramienta = document.getElementById(
          "input-info-extra-h-m" + arrayHerramientasMySQL[i].id
        );
        const inputModUrlLogoHerramienta = document.getElementById(
          "input-url-logo-h-m" + arrayHerramientasMySQL[i].id
        );
        const textareaModDescripcionHerramienta = document.getElementById(
          "textarea-descripcion-h-m" + arrayHerramientasMySQL[i].id
        );
        const inputModUrlPaginaHerramienta = document.getElementById(
          "input-url-pagina-h-m" + arrayHerramientasMySQL[i].id
        );

        const btnModificarHerramienta = document.getElementById(
          "btn-modificar-h" + arrayHerramientasMySQL[i].id
        );
        const btnEliminarHerramienta = document.getElementById(
          "btn-borrar-h" + arrayHerramientasMySQL[i].id
        );

        btnEliminarHerramienta.addEventListener("click", () => {
          eliminarHerramienta(arrayHerramientasMySQL[i].id);
        });

        inputModNombreH.addEventListener("keyup", () => {
          if (
            inputModNombreH.value.trim() === "" ||
            inputModUrlLogoHerramienta.value.trim() === "" ||
            textareaModDescripcionHerramienta.value.trim() === ""
          ) {
            btnModificarHerramienta.classList.add("btn-disabled");
          } else {
            btnModificarHerramienta.classList.remove("btn-disabled");
          }
        });
        inputModUrlLogoHerramienta.addEventListener("keyup", () => {
          if (
            inputModNombreH.value.trim() === "" ||
            inputModUrlLogoHerramienta.value.trim() === "" ||
            textareaModDescripcionHerramienta.value.trim() === ""
          ) {
            btnModificarHerramienta.classList.add("btn-disabled");
          } else {
            btnModificarHerramienta.classList.remove("btn-disabled");
          }
        });
        textareaModDescripcionHerramienta.addEventListener("keyup", () => {
          if (
            inputModNombreH.value.trim() === "" ||
            inputModUrlLogoHerramienta.value.trim() === "" ||
            textareaModDescripcionHerramienta.value.trim() === ""
          ) {
            btnModificarHerramienta.classList.add("btn-disabled");
          } else {
            btnModificarHerramienta.classList.remove("btn-disabled");
          }
        });

        btnModificarHerramienta.addEventListener("click", () => {
          let auxInfoExtra = null;
          let auxUrlPagina = null;
          if (inputModInfoExtraHerramienta.value.trim() !== "") {
            auxInfoExtra = inputModInfoExtraHerramienta.value.trim();
          }
          if (inputModUrlPaginaHerramienta.value.trim() !== "") {
            auxUrlPagina = inputModUrlPaginaHerramienta.value.trim();
          }

          const objetoHerramienta = {
            id: arrayHerramientasMySQL[i].id,
            nombre: inputModNombreH.value.trim(),
            info_extra: auxInfoExtra,
            img_logo: inputModUrlLogoHerramienta.value.trim(),
            descripcion: textareaModDescripcionHerramienta.value.trim(),
            url: auxUrlPagina,
          };

          modificarHerramienta(objetoHerramienta);
        });
      }
    }
  }
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

cargarComentarios();
