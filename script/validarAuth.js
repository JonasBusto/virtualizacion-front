import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

(function validarDato() {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      location.href = "../index.html";
    }
  });
})();
