var nombreUsuario = "Bienvenido/a Estimado";
var pin = 1234; // Establece tu PIN aquí
var limiteExtraccion = 3000;

var dineroExtraido;
var dineroDepositado;

var precioDeServicioAgua = 350;
var precioDeServicioLuz = 210;
var precioDeServicioInternet = 570;
var precioDeServicioTelefono = 425;

var cuentasClientes = [
  { nombreUsuario: "Cliente", codigoCuenta: 1234, saldo: 8000 },
  { nombreUsuario: "Cliente", codigoCuenta: 5678, saldo: 10000 }
];

// Variable para almacenar la cuenta seleccionada
var cuentaSeleccionada = null;

// Variable para indicar si ya se ingresó el PIN
var pinIngresado = false;

// Función para solicitar el PIN al inicio
function solicitarPIN() {
  if (!pinIngresado) {
    var inputPIN = prompt("Ingrese su PIN:");
    if (inputPIN === null || inputPIN === "") {
      alert("Operación cancelada. Debes ingresar el PIN para continuar.");
      solicitarPIN();
    } else if (isNaN(inputPIN)) {
      alert("Por favor, ingresa solo números para el PIN.");
      solicitarPIN();
    } else {
      var inputPINNum = parseInt(inputPIN);
      if (inputPINNum === pin) {
        pinIngresado = true;
        // Luego de autenticar, permite seleccionar la cuenta
        seleccionarCuenta();
      } else {
        alert("PIN incorrecto. Inténtalo de nuevo.");
        solicitarPIN();
      }
    }
  } else {
    // Si el PIN ya se ingresó, permite seleccionar la cuenta
    seleccionarCuenta();
  }
}

// Función para seleccionar una cuenta
function seleccionarCuenta() {
  var cuentasDisponibles = "";
  for (var i = 0; i < cuentasClientes.length; i++) {
    cuentasDisponibles += (i + 1) + " - " + cuentasClientes[i].nombreUsuario + "\n";
  }
  var seleccion = prompt("Seleccione una cuenta:\n" + cuentasDisponibles);
  if (seleccion === null || seleccion === "") {
    alert("Operación cancelada. Debes seleccionar una cuenta.");
    seleccionarCuenta();
  } else {
    var seleccionNum = parseInt(seleccion);
    if (seleccionNum >= 1 && seleccionNum <= cuentasClientes.length) {
      cuentaSeleccionada = seleccionNum - 1; // Restamos 1 para obtener el índice correcto del array
      // Después de seleccionar la cuenta, ejecuta el resto del programa
      cargarNombreEnPantalla();
      actualizarSaldoEnPantalla();
      actualizarLimiteEnPantalla();
      // Puedes agregar aquí otras funciones específicas de la cuenta seleccionada
    } else {
      alert("Selección inválida. Por favor, elige una cuenta válida.");
      seleccionarCuenta();
    }
  }
}

// Llamamos a la función para solicitar el PIN al inicio
solicitarPIN();

// Funciones restantes...

// Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = nombreUsuario + " " + cuentasClientes[cuentaSeleccionada].nombreUsuario;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$" + cuentasClientes[cuentaSeleccionada].saldo;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function sumarDinero(cantidad) {
  cuentasClientes[cuentaSeleccionada].saldo += cantidad;
}

function restarDinero(cantidad) {
  cuentasClientes[cuentaSeleccionada].saldo -= cantidad;
}

function cambiarLimiteDeExtraccion() {
  var nuevoLimite = prompt("Ingrese un nuevo límite de extracción:");
  if (nuevoLimite !== null && nuevoLimite !== "") {
    var nuevoLimiteNum = parseInt(nuevoLimite);
    if (!isNaN(nuevoLimiteNum)) {
      limiteExtraccion = nuevoLimiteNum;
      actualizarLimiteEnPantalla();
      alert("El nuevo límite de extracción es: $" + limiteExtraccion);
    } else {
      alert("Por favor, ingresa un monto válido para el límite de extracción.");
    }
  } else {
    alert("Operación cancelada. No se ingresó un nuevo límite de extracción.");
  }
}

function mostrarOperacion(alertaDeOperacion, accionDeOperacion, transaccionDeDinero) {
  alert(
    "Has " + alertaDeOperacion + ": $" + transaccionDeDinero + "\n" +
    "Saldo anterior: $" + accionDeOperacion + "\n" +
    "Saldo actual: $" + cuentasClientes[cuentaSeleccionada].saldo
  );
}

function extraerDinero() {
  var extraerDinero = prompt("Ingrese la cantidad de dinero que desea extraer:");
  if (extraerDinero !== null && extraerDinero !== "") {
    var dineroExtraido = parseInt(extraerDinero);
    if (!isNaN(dineroExtraido)) {
      if (dineroExtraido > cuentasClientes[cuentaSeleccionada].saldo) {
        alert("No hay saldo disponible para extraer esa cantidad de dinero.");
      } else if (dineroExtraido > limiteExtraccion) {
        alert("La cantidad que deseas extraer es mayor a tu límite de extracción.");
      } else if (dineroExtraido % 100 !== 0) {
        alert("Solo puedes extraer billetes de 100.");
      } else {
        restarDinero(dineroExtraido);
        mostrarOperacion(
          "retirado",
          cuentasClientes[cuentaSeleccionada].saldo + dineroExtraido,
          dineroExtraido
        );
        actualizarSaldoEnPantalla();
      }
    } else {
      alert("Por favor, ingresa un monto válido para extraer.");
    }
  } else {
    alert("Operación cancelada. No se ingresó un monto para extraer.");
  }
}

function depositarDinero() {
  var depositarDinero = prompt("Ingrese la cantidad de dinero que desea depositar:");
  if (depositarDinero !== null && depositarDinero !== "") {
    var dineroDepositado = parseInt(depositarDinero);
    if (!isNaN(dineroDepositado)) {
      sumarDinero(dineroDepositado);
      mostrarOperacion(
        "depositado",
        cuentasClientes[cuentaSeleccionada].saldo - dineroDepositado,
        dineroDepositado
      );
      actualizarSaldoEnPantalla();
    } else {
      alert("Por favor, ingresa un monto válido para depositar.");
    }
  } else {
    alert("Operación cancelada. No se ingresó un monto para depositar.");
  }
}

function pagoDeServicio(servicio, precioDeServicio) {
  if (cuentasClientes[cuentaSeleccionada].saldo < precioDeServicio) {
    alert("No hay suficiente saldo para pagar este servicio.");
  } else {
    alert(
      "Has pagado el servicio " + servicio + ".\n" +
      "Saldo anterior: $" + cuentasClientes[cuentaSeleccionada].saldo + "\n" +
      "Dinero descontado: $" + precioDeServicio + "\n" +
      "Saldo actual: $" + (cuentasClientes[cuentaSeleccionada].saldo - precioDeServicio)
    );
    restarDinero(precioDeServicio);
    actualizarSaldoEnPantalla();
  }
}

function pagarServicio() {
  var servicioAPagar = prompt(
    "Ingrese el número que corresponda con el servicio que quieres pagar:" + "\n" +
    "1 - Agua" + "\n" +
    "2 - Luz" + "\n" +
    "3 - Internet" + "\n" +
    "4 - Teléfono" + "\n"
  );
  if (servicioAPagar !== null && servicioAPagar !== "") {
    var servicioAPagarNum = parseInt(servicioAPagar);
    if (!isNaN(servicioAPagarNum) && servicioAPagarNum >= 1 && servicioAPagarNum <= 4) {
      switch (servicioAPagarNum) {
        case 1:
          pagoDeServicio("Agua", precioDeServicioAgua);
          break;
        case 2:
          pagoDeServicio("Luz", precioDeServicioLuz);
          break;
        case 3:
          pagoDeServicio("Internet", precioDeServicioInternet);
          break;
        case 4:
          pagoDeServicio("Teléfono", precioDeServicioTelefono);
          break;
      }
    } else {
      alert("Selección inválida. Por favor, elige un servicio válido.");
    }
  } else {
    alert("Operación cancelada. No se ingresó un servicio para pagar.");
  }
}

function verCuentas() {
  var cuentasDisponibles = "";
  for (var i = 0; i < cuentasClientes.length; i++) {
    cuentasDisponibles += "Cuenta " + (i + 1) + ": " + cuentasClientes[i].nombreUsuario + " - Saldo: $" + cuentasClientes[i].saldo + "\n";
  }
  alert("Tus cuentas disponibles:\n" + cuentasDisponibles);
}

// Función para transferir dinero
function transferirDinero() {
  var cuentasDisponibles = "";
  for (var i = 0; i < cuentasClientes.length; i++) {
    cuentasDisponibles += (i + 1) + " - " + cuentasClientes[i].nombreUsuario + "\n";
  }

  var cuentasDestino = generarCuentasAleatorias(4); // Generamos 4 cuentas aleatorias

  var opcionesTransferencia = "";
  for (var i = 0; i < cuentasDestino.length; i++) {
    opcionesTransferencia += (i + 1) + " - " + cuentasDestino[i].nombreUsuario + "\n";
  }

  var opcionCuentaDestino = prompt("Seleccione una cuenta para transferir:\n" + opcionesTransferencia);
  if (opcionCuentaDestino === null || opcionCuentaDestino === "") {
    alert("Operación cancelada. Debes seleccionar una cuenta para transferir.");
  } else {
    var opcionNum = parseInt(opcionCuentaDestino);
    if (opcionNum >= 1 && opcionNum <= cuentasDestino.length) {
      var cuentaDestino = cuentasDestino[opcionNum - 1]; // Restamos 1 para obtener el índice correcto del array

      var montoTransferencia = prompt("Ingrese el monto a transferir:");
      if (montoTransferencia === null || montoTransferencia === "") {
        alert("Operación cancelada. No se ingresó un monto para transferir.");
      } else {
        var montoNum = parseInt(montoTransferencia);
        if (!isNaN(montoNum) && montoNum > 0 && montoNum <= cuentasClientes[cuentaSeleccionada].saldo) {
          // Realizamos la transferencia
          restarDinero(montoNum);
          cuentaDestino.saldo += montoNum;

          // Mostramos la operación
          alert(
            "Has transferido $" + montoNum + " a la cuenta de " + cuentaDestino.nombreUsuario + ".\n" +
            "Saldo anterior: $" + (cuentasClientes[cuentaSeleccionada].saldo + montoNum) + "\n" +
            "Saldo actual: $" + cuentasClientes[cuentaSeleccionada].saldo
          );

          // Actualizamos saldos en pantalla
          actualizarSaldoEnPantalla();
        } else {
          alert("Monto inválido para transferir o saldo insuficiente.");
        }
      }
    } else {
      alert("Selección inválida. Por favor, elige una cuenta válida.");
    }
  }
}

// Función para generar cuentas aleatorias
function generarCuentasAleatorias(cantidad) {
  var cuentasAleatorias = [];
  for (var i = 0; i < cantidad; i++) {
    var saldoAleatorio = Math.floor(Math.random() * 5000) + 1000; // Saldo aleatorio entre 1000 y 6000
    cuentasAleatorias.push({ nombreUsuario: "Destino" + (i + 1), codigoCuenta: 8000 + i, saldo: saldoAleatorio });
  }
  return cuentasAleatorias;
}