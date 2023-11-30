let pantallaValor = "";
let operadorActual = "";
const apiKey = "e6beef4e01d2da7985009788";
let tasaDeCambio = 1.0;
let historial = [];
let temaClaro = true;

function agregarNumero(numero) {
  pantallaValor += numero;
  actualizarPantalla();
}

function establecerOperador(op) {
  if (pantallaValor !== "") {
    operadorActual = op;
    pantallaValor += " " + op + " ";
    actualizarPantalla();
  }
}

function limpiarPantalla() {
  pantallaValor = "";
  operadorActual = "";
  historial = [];
  actualizarPantalla();
  actualizarHistorial();
}

function calcularResultado() {
  let resultado = eval(pantallaValor);
  pantallaValor = resultado.toString();
  operadorActual = "";
  actualizarPantalla();

  historial.push(`${pantallaValor} = ${resultado}`);
  actualizarHistorial();
}

function actualizarPantalla() {
  document.getElementById("pantalla").value = pantallaValor;
}

function borrarUltimo() {
  pantallaValor = pantallaValor.slice(0, -1);
  actualizarPantalla();
}

function agregarOperacion(operacion) {
  pantallaValor += operacion;
  actualizarPantalla();
}

function calcularRaizCuadrada() {
  let resultado = Math.sqrt(parseFloat(pantallaValor));
  pantallaValor = resultado.toString();
  actualizarPantalla();
}

function actualizarHistorial() {
  document.getElementById("historial").innerText = historial.join("\n");
}

async function cambiarMoneda() {
  let nuevaMoneda = prompt(
    "Ingrese el código de la nueva moneda (por ejemplo, EUR):"
  );

  if (nuevaMoneda) {
    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${nuevaMoneda}?apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.result === "success") {
        tasaDeCambio = data.conversion_rates[nuevaMoneda];
        alert(
          `Tasa de cambio para ${nuevaMoneda} actualizada a ${tasaDeCambio}`
        );
      } else {
        alert(
          "Error al obtener la tasa de cambio. Ingresa un código de moneda válido."
        );
      }
    } catch (error) {
      console.error("Error al obtener la tasa de cambio:", error);
      alert(
        "Error al obtener la tasa de cambio. Inténtalo de nuevo más tarde."
      );
    }
  } else {
    alert("Ingresa un código de moneda válido.");
  }
}

function cambiarTema() {
  temaClaro = !temaClaro;

  document.body.style.backgroundColor = temaClaro ? "#fff" : "#333";
  document.body.style.color = temaClaro ? "#333" : "#fff";
  document.getElementById("historial").style.color = temaClaro
    ? "#333"
    : "#fff";
}

function manejarTecla(tecla) {
  if (/[0-9+\-*/.]/.test(tecla)) {
    agregarNumero(tecla);
  } else if (tecla === "=") {
    calcularResultado();
  } else if (tecla === "Enter") {
    calcularResultado();
  } else if (tecla === "Backspace") {
    borrarUltimo();
  } else if (tecla === "c" || tecla === "C") {
    limpiarPantalla();
  } else if (tecla === "s" || tecla === "S") {
    cambiarMoneda();
  } else if (tecla === "^") {
    agregarOperacion("**");
  } else if (tecla === "r" || tecla === "R") {
    calcularRaizCuadrada();
  }
}

module.exports = {
  agregarNumero,
  establecerOperador,
  calcularResultado,
  limpiarPantalla,
};
