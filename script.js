let coleccion = {
  pirata: false,
  rockero: false,
  vampiro: false,
  musica: false,
};
function desbloquear(nombre, idElemento, titulo, imagen) {
  if (coleccion[nombre]) return;

  coleccion[nombre] = true;

  localStorage.setItem("coleccionBadtz", JSON.stringify(coleccion));

  const carta = document.getElementById(idElemento);

  if (carta) {
    carta.classList.remove("bloqueado");
    carta.classList.add("desbloqueado");
  }

  mostrarPopupBadtz(titulo, imagen);
}
function mostrarPopupBadtz(nombre, imagen) {
  const overlay = document.getElementById("overlay-badtz");

  if (!overlay) {
    console.log("No se encontró overlay-badtz");
    return;
  }

  document.getElementById("popup-img").src = imagen;
  document.getElementById("popup-nombre").textContent = nombre;

  overlay.classList.add("mostrar");

  setTimeout(() => {
    overlay.classList.remove("mostrar");
  }, 7000);
}
const mensajes = [
  "Eres más importante para mí de lo que probablemente imaginas.",
  "A veces te admiro más de lo que te digo.",
  "Me gusta cuando me cuentas cosas que te emocionan.",
  "Me gusta escucharte hablar incluso cuando no entiendo la mitad de lo que dices.",
  "No tienes que ser fuerte todo el tiempo.",
  "Espero que seas un poco más amable contigo misma.",
  "Gracias por confiar en mí.",
  "Eres bastante increíble, aunque seguramente me discutirías eso.",
  "Me gusta que seas tú.",
  "No cambies por encajar en donde no te valoran.",
  "Tu felicidad me importa.",
];

let indice = 0;

function mostrarMensaje() {
  desbloquear(
    "vampiro",
    "badtzVampiro",
    "🧛 Badtz Vampiro",
    "images/badtz-vampiro.png"
  );
  const sorpresa = document.getElementById("sorpresa");

  sorpresa.innerHTML = mensajes[indice];

  indice++;

  if (indice >= mensajes.length) {
    indice = 0;
  }
}

/* =========================
   CAMBIO DE PÁGINAS
========================= */

function mostrar(pagina, btn) {
  const paginas = document.querySelectorAll(".pagina");

  paginas.forEach((p) => {
    p.classList.remove("activa");
  });

  const paginaActiva = document.getElementById(pagina);

  if (paginaActiva) {
    paginaActiva.classList.add("activa");
  }

  const botones = document.querySelectorAll(".menu-btn");

  botones.forEach((b) => {
    b.classList.remove("active");
  });

  btn.classList.add("active");

  /* Si abre el juego, reposiciona a Badtz */
  if (pagina === "juego") {
    setTimeout(() => {
      moverBadtz();
    }, 100);
  }
}

/* =========================
   SIDEBAR
========================= */

function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");

  sidebar.classList.toggle("hidden");
}

/* =========================
   MÚSICA
========================= */

function toggleMusica() {
  const musica = document.getElementById("musica");
  const boton = document.querySelector(".boton-musica");
  const texto = document.getElementById("textoMusica");

  if (!musica) return;

  if (musica.paused) {
    musica.play();

    desbloquear(
      "musica",
      "badtzMusica",
      "🎵 Badtz Melómano",
      "images/badtz-musica.png"
    );
    boton.classList.add("reproduciendo");

    texto.textContent = "Pausar música 🎵";
  } else {
    musica.pause();

    boton.classList.remove("reproduciendo");

    texto.textContent = "Escuchar una canción que me recuerda a ti";
  }
}

/* =========================
   JUEGO BADTZ-MARU
========================= */

let puntosJuego = 0;

function moverBadtz() {
  const area = document.getElementById("area-juego");
  const badtz = document.getElementById("badtz");

  if (!area || !badtz) return;

  const maxX = area.clientWidth - badtz.offsetWidth;
  const maxY = area.clientHeight - badtz.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  badtz.style.left = x + "px";
  badtz.style.top = y + "px";
}

document.addEventListener("DOMContentLoaded", () => {
  const badtz = document.getElementById("badtz");

  if (!badtz) return;

  moverBadtz();

  badtz.addEventListener("click", () => {
    puntosJuego++;

    document.getElementById("puntos").textContent = puntosJuego;

    moverBadtz();

    if (puntosJuego === 3) {
      document.getElementById("premio").innerHTML =
        "❤️ Sabía que te esforzarías.";
    }

    if (puntosJuego === 6) {
      document.getElementById("premio").innerHTML = "🖤 Ya casi llegas";
    }

    if (puntosJuego === 10) {
      document.getElementById("premio").innerHTML = `
        🎉 ¡Ganaste!

        <br><br>

        ❤️ Premio desbloqueado ❤️

        <br><br>

        Gracias por jugar. Nunca he hecho juegos, así que soy medio malo XD

        <br><br>

        Baldis Basic Meme Tiktok Buscar
        `;
      desbloquear(
        "pirata",
        "badtzPirata",
        "🏴‍☠️ Badtz Pirata",
        "images/badtz-pirata.png"
      );
    }
  });
});
function corregirQuiz() {
  let puntaje = 0;

  for (let i = 1; i <= 5; i++) {
    const respuesta = document.querySelector(`input[name="p${i}"]:checked`);

    if (respuesta) {
      puntaje += Number(respuesta.value);
    }
  }

  const resultado = document.getElementById("resultadoQuiz");

  if (puntaje === 5) {
    resultado.innerHTML = "💖 5/5 - Me conoces demasiado bien.";
    desbloquear(
      "rockero",
      "badtzRockero",
      "🎸 Badtz Rockero",
      "images/badtz-rockero.png"
    );
  } else if (puntaje === 4) {
    resultado.innerHTML = "🌸 4/5 - Casi perfecto.";
  } else if (puntaje === 3) {
    resultado.innerHTML = "🖤 3/5 - Aprobaste raspando.";
  } else {
    resultado.innerHTML = "._.";
  }
}
