//Para almacenar el carrito de compras en un arreglo global
let lstCarrito = {
  productos: [],
  cantidad: 0,
  total: 0,
};

//Agregando funcionalidad al boton de carrito para redireccionar a la pagina correcta dependiendo de la ruta
let btnCarrito = document.querySelector("#btnCarrito");
btnCarrito.addEventListener("click", function (e) {
  window.location.pathname.includes("paginas")
    ? (window.location.href = "verCarrito.html")
    : (window.location.href = "paginas/verCarrito.html");
});

//Funcion global para separar por metodos las paginas
function funcionalidadPaginas(
  fnInicio,
  fnProductos,
  fnVerCarrito,
  fnVerProducto
) {
  //Para actualizar la cantidad en el icono del carrito de compras
  if (localStorage.getItem("lstCarrito")) {
    lstCarrito = JSON.parse(localStorage.getItem("lstCarrito"));
    document.querySelector("#cantidadCarrito").innerText = JSON.parse(
      localStorage.getItem("lstCarrito")
    ).cantidad;
  }

  //Para obtener la ruta en donde nos encontramos
  let ruta = window.location.pathname;
  if (!ruta.includes(".html") || ruta.includes("/index")) fnInicio();
  else if (ruta.includes("/productos")) fnProductos();
  else if (ruta.includes("/verCarrito")) fnVerCarrito();
  else if (ruta.includes("/verProducto")) fnVerProducto();
}

//Para Crear coffeti
function crearCoffeti() {
  const numeroAleatorio = Math.floor(Math.random() * 5) + 1;

  if (numeroAleatorio === 1) {
    const duration = 15 * 1000,
      animationEnd = Date.now() + duration,
      defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  } else if (numeroAleatorio === 2) {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["star"],
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  } else if (numeroAleatorio === 3) {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.2,
        shapes: ["circle", "square"],
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
      });

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 2,
        shapes: ["text"],
        shapeOptions: {
          text: {
            value: ["🦄", "🌈"],
          },
        },
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  } else if (numeroAleatorio === 4) {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ["heart"],
      colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
    };

    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 2,
    });

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 3,
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 4,
    });
  } else {
    const end = Date.now() + 15 * 1000;

    // go Buckeyes!
    const colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

//Para obtener el precio total del carrito
function carritoTotalPrecio(lstCarrito) {
  let total = 0;
  lstCarrito.forEach(function (carrito) {
    total += carrito.precio * carrito.cantidad;
  });

  return total;
}

//Para notificaciones
function showNotification(message) {
  // Configuración de la notificación
  Toastify({
    text: message,
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}
