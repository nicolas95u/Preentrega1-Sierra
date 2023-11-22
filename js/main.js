// Variable para almacenar el nombre de usuario
let nombreUsuario = "Bienvenido/a Estimado";

// Variables de configuración
let pin = 1234; // Establece tu PIN aquí
let limiteExtraccion = 3000;

// Variables para transacciones
let dineroExtraido;
let dineroDepositado;

// Precios de servicios
const precioDeServicioAgua = 350;
const precioDeServicioLuz = 210;
const precioDeServicioInternet = 570;
const precioDeServicioTelefono = 425;

// Cuentas de clientes
const cuentasClientes = [
  { nombreUsuario: "Cliente", codigoCuenta: 1234, saldo: 8000 },
  { nombreUsuario: "Cliente", codigoCuenta: 5678, saldo: 10000 }
];

// Variable para almacenar la cuenta seleccionada
let cuentaSeleccionada = null;

// Variable para indicar si ya se ingresó el PIN
let pinIngresado = false;

// Llamamos a la función para solicitar el PIN al inicio
cargarDatosGuardados(); // Cargar datos al inicio
solicitarPIN();

// Función para cargar datos guardados desde localStorage
function cargarDatosGuardados() {
  const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario');
  const cuentaSeleccionadaGuardada = localStorage.getItem('cuentaSeleccionada');

  if (nombreUsuarioGuardado) {
    nombreUsuario = nombreUsuarioGuardado;
    // Actualizar otros datos necesarios
  }

  if (pinIngresadoGuardado === 'true') {
    pinIngresado = true;
    // Realizar acciones adicionales después de ingresar el PIN
  }

  if (cuentaSeleccionadaGuardada !== null) {
    cuentaSeleccionada = parseInt(cuentaSeleccionadaGuardada, 10);
    // Realizar acciones adicionales después de seleccionar la cuenta
  }
}

// Al finalizar una operación, guardar datos actualizados
function guardarDatosEnLocalStorage() {
  localStorage.setItem('nombreUsuario', nombreUsuario);
  localStorage.setItem('pinIngresado', pinIngresado.toString());
  localStorage.setItem('cuentaSeleccionada', cuentaSeleccionada);
}

// Función para solicitar el PIN al inicio
function solicitarPIN() {
  Swal.fire({
    title: 'Ingrese su PIN:',
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off',
      maxlength: 4,
      inputMode: 'numeric',
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (inputPIN) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (inputPIN === '' || isNaN(inputPIN)) {
            Swal.showValidationMessage('Por favor, ingresa solo números para el PIN.');
          } else {
            const inputPINNum = parseInt(inputPIN);
            if (inputPINNum === pin) {
              pinIngresado = true;
              // Luego de autenticar, permite seleccionar la cuenta
              seleccionarCuenta();
            } else {
              Swal.showValidationMessage('PIN incorrecto. Inténtalo de nuevo.');
            }
          }
          resolve();
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

// Función para seleccionar una cuenta
function seleccionarCuenta() {
  const cuentasDisponibles = cuentasClientes.map((cuenta, index) => `${index + 1} - ${cuenta.nombreUsuario}`);

  Swal.fire({
    title: 'Seleccione una cuenta:',
    input: 'select',
    inputOptions: cuentasDisponibles,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (seleccion) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const seleccionNum = parseInt(seleccion);
          if (seleccionNum >= 0 && seleccionNum <= cuentasClientes.length - 1) {
            cuentaSeleccionada = seleccionNum; // Restamos 1 para obtener el índice correcto del array
            // Después de seleccionar la cuenta, ejecuta el resto del programa
            cargarNombreEnPantalla();
            actualizarSaldoEnPantalla();
            actualizarLimiteEnPantalla();
            // Puedes agregar aquí otras funciones específicas de la cuenta seleccionada
          } else {
            Swal.showValidationMessage('Selección inválida. Por favor, elige una cuenta válida.');
          }
          resolve();
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

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
  Swal.fire({
    title: 'Ingrese un nuevo límite de extracción:',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      inputMode: 'numeric',
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (nuevoLimite) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const nuevoLimiteNum = parseInt(nuevoLimite);
          if (!isNaN(nuevoLimiteNum)) {
            limiteExtraccion = nuevoLimiteNum;
            actualizarLimiteEnPantalla();
            Swal.fire('Éxito', `El nuevo límite de extracción es: $${limiteExtraccion}`, 'success');
          } else {
            Swal.showValidationMessage('Por favor, ingresa un monto válido para el límite de extracción.');
          }
          resolve();
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

function mostrarOperacion(alertaDeOperacion, accionDeOperacion, transaccionDeDinero) {
  Swal.fire({
    title: 'Operación Exitosa',
    html: `Has ${alertaDeOperacion} $${transaccionDeDinero}<br>
    Saldo anterior: $${accionDeOperacion}<br>
    Saldo actual: $${cuentasClientes[cuentaSeleccionada].saldo}`,
    icon: 'success'
  });
}

function extraerDinero() {
  Swal.fire({
    title: 'Ingrese la cantidad de dinero que desea extraer:',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      inputMode: 'numeric',
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (extraerDinero) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dineroExtraido = parseInt(extraerDinero);
          if (!isNaN(dineroExtraido)) {
            if (dineroExtraido > cuentasClientes[cuentaSeleccionada].saldo) {
              Swal.fire('Error', 'No hay saldo disponible para extraer esa cantidad de dinero.', 'error');
            } else if (dineroExtraido > limiteExtraccion) {
              Swal.fire('Error', 'La cantidad que deseas extraer es mayor a tu límite de extracción.', 'error');
            } else if (dineroExtraido % 100 !== 0) {
              Swal.fire('Error', 'Solo puedes extraer billetes de 100.', 'error');
            } else {
              restarDinero(dineroExtraido);
              mostrarOperacion('retirado', cuentasClientes[cuentaSeleccionada].saldo + dineroExtraido, dineroExtraido);
              actualizarSaldoEnPantalla();
            }
          } else {
            Swal.showValidationMessage('Por favor, ingresa un monto válido para extraer.');
          }
          resolve();
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

function depositarDinero() {
  Swal.fire({
    title: 'Ingrese la cantidad de dinero que desea depositar:',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      inputMode: 'numeric',
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (depositarDinero) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dineroDepositado = parseInt(depositarDinero);
          if (!isNaN(dineroDepositado)) {
            sumarDinero(dineroDepositado);
            mostrarOperacion('depositado', cuentasClientes[cuentaSeleccionada].saldo - dineroDepositado, dineroDepositado);
            actualizarSaldoEnPantalla();
          } else {
            Swal.showValidationMessage('Por favor, ingresa un monto válido para depositar.');
          }
          resolve();
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
  guardarDatosEnLocalStorage(); // Guardar datos actualizados
}

function pagoDeServicio(servicio, precioDeServicio) {
  if (cuentasClientes[cuentaSeleccionada].saldo < precioDeServicio) {
    Swal.fire('Error', 'No hay suficiente saldo para pagar este servicio.', 'error');
  } else {
    Swal.fire({
      title: `Has pagado el servicio ${servicio}.`,
      html: `Saldo anterior: $${cuentasClientes[cuentaSeleccionada].saldo}<br>
      Dinero descontado: $${precioDeServicio}<br>
      Saldo actual: $${(cuentasClientes[cuentaSeleccionada].saldo - precioDeServicio)}`,
      icon: 'success'
    });
    restarDinero(precioDeServicio);
    actualizarSaldoEnPantalla();
  }
}

function pagarServicio() {
  const opcionesServicio = {
    0: { servicio: 'Agua', precio: precioDeServicioAgua },
    1: { servicio: 'Luz', precio: precioDeServicioLuz },
    2: { servicio: 'Internet', precio: precioDeServicioInternet },
    3: { servicio: 'Teléfono', precio: precioDeServicioTelefono }
  };

  Swal.fire({
    title: `Seleccione el servicio que desea pagar:`,
    input: 'select',
    inputOptions: Object.keys(opcionesServicio).map((key) => `${key} - ${opcionesServicio[key].servicio}`),
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (opcion) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const opcionNum = parseInt(opcion);
          if (!isNaN(opcionNum) && opcionNum >= 0 && opcionNum <= 3) {
            const servicio = opcionesServicio[opcionNum];
            pagoDeServicio(servicio.servicio, servicio.precio);
          } else {
            Swal.showValidationMessage('Selección inválida. Por favor, elige un servicio válido.');
          }
          resolve();
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

function verCuentas() {
  let cuentasDisponibles = "";
  for (let i = 0; i < cuentasClientes.length; i++) {
    cuentasDisponibles += `Cuenta ${i + 1}: ${cuentasClientes[i].nombreUsuario} - Saldo: $${cuentasClientes[i].saldo}\n`;
  }
  Swal.fire('Tus cuentas disponibles:', cuentasDisponibles);
}

// Función para transferir dinero
function transferirDinero() {
  const cuentasDestino = generarCuentasAleatorias(4);

  Swal.fire({
    title: 'Seleccione una cuenta para transferir:',
    input: 'select',
    inputOptions: cuentasDestino.map((cuenta, index) => `${index + 1} - ${cuenta.nombreUsuario}`),
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (seleccion) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const opcionNum = parseInt(seleccion);
          if (opcionNum >= 1 && opcionNum <= cuentasDestino.length) {
            const cuentaDestino = cuentasDestino[opcionNum - 1];

            Swal.fire({
              title: 'Ingrese el monto a transferir:',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off',
                inputMode: 'numeric',
              },
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
              showLoaderOnConfirm: true,
              preConfirm: (montoTransferencia) => {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    const montoNum = parseInt(montoTransferencia);
                    if (!isNaN(montoNum) && montoNum > 0 && montoNum <= cuentasClientes[cuentaSeleccionada].saldo) {
                      restarDinero(montoNum);
                      cuentaDestino.saldo += montoNum;

                      Swal.fire(
                        'Transferencia exitosa',
                        `Has transferido $${montoNum} a la cuenta de ${cuentaDestino.nombreUsuario}.`,
                        'success'
                      );

                      actualizarSaldoEnPantalla();
                    } else {
                      Swal.showValidationMessage('Monto inválido para transferencia o saldo insuficiente.');
                    }
                    resolve();
                  }, 1000);
                });
              },
              allowOutsideClick: () => !Swal.isLoading(),
            });
          } else {
            Swal.showValidationMessage('Selección inválida. Por favor, elige una cuenta válida.');
          }
          resolve();
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
}

// Función para generar cuentas aleatorias
function generarCuentasAleatorias(cantidad) {
  const cuentasAleatorias = [];
  for (let i = 0; i < cantidad; i++) {
    const saldoAleatorio = Math.floor(Math.random() * 5000) + 1000; // Saldo aleatorio entre 1000 y 6000
    cuentasAleatorias.push({ nombreUsuario: "Destino" + (i + 1), codigoCuenta: 8000 + i, saldo: saldoAleatorio });
  }
  return cuentasAleatorias;
}

