let coleccion = {
  pirata: false,
  rockero: false,
  vampiro: false,
  musica: false,
  leyendo: false,
  cupido: false,
  veraniego: false,
  dormido: false,
  mono: false,
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
function encontrarBadtz(nombre, idCarta, titulo, imagen, elemento) {
  desbloquear(nombre, idCarta, titulo, imagen);

  localStorage.setItem("badtz_" + nombre, "encontrado");

  elemento.style.display = "none";

  verificarColeccionCompleta();
}
function verificarColeccionCompleta() {
  const secretos =
    coleccion.leyendo &&
    coleccion.cupido &&
    coleccion.veraniego &&
    coleccion.dormido &&
    coleccion.mono;

  if (secretos) {
    const boton = document.getElementById("btnSorpresaFinal");

    if (boton) {
      boton.style.display = "block";
    }

    localStorage.setItem("sorpresaFinal", "desbloqueada");
  }
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
  "Eres una de esas personas que hacen que los días malos pesen un poco menos.",
  "No siempre sé encontrar las palabras correctas, pero siempre quiero que estés bien.",
  "Me gusta la tranquilidad que siento cuando hablo contigo.",
  "Espero que nunca dudes de lo mucho que vales.",
  "Hay muchas cosas que admiro de ti, incluso las que tú no ves.",
  "Gracias por dejarme formar parte de tus días.",
  "Me haces querer ser una mejor persona.",
  "A veces solo espero que puedas verte con los ojos con los que yo te veo.",
  "Está bien descansar. No tienes que demostrar nada todo el tiempo.",
  "Me gusta saber que existes.",
  "Si algún día sientes que todo va mal, recuerda que eso no cambia la persona que eres.",
  "No tienes que ser perfecta para que alguien te quiera.",
  "Espero poder sacarte una sonrisa incluso en tus días más pesados.",
  "Hay personas que simplemente hacen el mundo un poquito mejor. Tú eres una de ellas.",
  "Me gusta que puedas ser tú cuando estás conmigo.",
  "No olvides celebrar también las pequeñas victorias.",
  "A veces eres mucho más fuerte de lo que crees.",
  "Quiero que recuerdes que no estás sola.",
  "Siempre vale la pena escuchar lo que tienes para decir.",
  "Hay días difíciles, pero también habrá días muy bonitos.",
  "Me alegra mucho haberte conocido.",
  "No dejes que un mal momento te haga olvidar todo lo bueno que hay en ti.",
  "Me gusta cuando te emocionas contando algo que te gusta.",
  "Ojalá algún día puedas hablarte con la misma paciencia con la que hablas a los demás.",
  "Verte feliz siempre me alegra un poquito el día.",
  "Gracias por ser parte de mi vida.",
  "Hay recuerdos contigo que me hacen sonreír sin darme cuenta.",
  "Espero que nunca pierdas esa forma tan tuya de ser.",
  "Me gusta cuidar de ti, aunque a veces no sepa muy bien cómo hacerlo.",
  "Solo quería recordarte que eres importante para mí.",
];

let indice = 0;

function mostrarMensaje() {
  if (!coleccion.vampiro) {
    desbloquear(
      "vampiro",
      "badtzVampiro",
      "🧛 Badtz Vampiro",
      "images/badtz-vampiro.png"
    );
  }

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

    if (!coleccion.musica) {
      desbloquear(
        "musica",
        "badtzMusica",
        "🎵 Badtz Melómano",
        "images/badtz-musica.png"
      );
    }

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
  const guardado = localStorage.getItem("coleccionBadtz");

  if (guardado) {
    const defaults = {
      pirata: false,
      rockero: false,
      vampiro: false,
      musica: false,
      leyendo: false,
      cupido: false,
      veraniego: false,
      dormido: false,
      mono: false,
    };

    if (guardado) {
      coleccion = { ...defaults, ...JSON.parse(guardado) };
    } else {
      coleccion = defaults;
    }
  }

  const escondidos = {
    leyendo: document.querySelector(".badtz-leyendo"),
    cupido: document.querySelector(".badtz-cupido"),
    dormido: document.querySelector(".badtz-dormido"),
    veraniego: document.querySelector(".badtz-veraniego"),
    mono: document.querySelector(".badtz-mono"),
  };

  Object.keys(escondidos).forEach((nombre) => {
    if (coleccion[nombre] && escondidos[nombre]) {
      escondidos[nombre].style.display = "none";
      escondidos[nombre].onclick = null;
    }
  });
  const mapa = {
    pirata: "badtzPirata",
    rockero: "badtzRockero",
    vampiro: "badtzVampiro",
    musica: "badtzMusica",
    leyendo: "badtzLeyendo",
    cupido: "badtzCupido",
    veraniego: "badtzVeraniego",
    dormido: "badtzDormido",
    mono: "badtzMono",
  };

  Object.keys(coleccion).forEach((nombre) => {
    if (coleccion[nombre]) {
      const carta = document.getElementById(mapa[nombre]);

      if (carta) {
        carta.classList.remove("bloqueado");
        carta.classList.add("desbloqueado");
      }
    }
  });

  const primera = document.querySelector(".foto-recuerdo");

  if (primera) {
    abrirRecuerdo(primera);
  }
  const boton = document.getElementById("btnSorpresaFinal");

  if (boton) {
    const desbloqueada =
      localStorage.getItem("sorpresaFinal") === "desbloqueada";
    boton.style.display = desbloqueada ? "block" : "none";
  }

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
function abrirRecuerdo(foto) {
  document.querySelectorAll(".texto-recuerdo").forEach((texto) => {
    texto.classList.remove("activo");
  });

  document.querySelectorAll(".foto-recuerdo").forEach((img) => {
    img.classList.remove("activa");
  });

  foto.classList.add("activa");

  foto.nextElementSibling.classList.add("activo");
}
localStorage.removeItem("coleccionBadtz");
localStorage.removeItem("sorpresaFinal");

for (const k in localStorage) {
  if (k.startsWith("badtz_")) {
    localStorage.removeItem(k);
  }
}
function crearPetalo() {
  const petalo = document.createElement("div");

  petalo.className = "petalo";
  const iconos = ["🖤", "🌙", "✨", "🦇", "🕯️"];

  petalo.innerHTML = iconos[Math.floor(Math.random() * iconos.length)];

  petalo.style.left = Math.random() * window.innerWidth + "px";

  petalo.style.fontSize = 18 + Math.random() * 18 + "px";

  petalo.style.animationDuration = 6 + Math.random() * 5 + "s";

  petalo.style.transform = "rotate(" + Math.random() * 360 + "deg)";

  document.body.appendChild(petalo);

  petalo.addEventListener("animationend", () => {
    petalo.remove();
  });
}
setInterval(crearPetalo, 1200);
