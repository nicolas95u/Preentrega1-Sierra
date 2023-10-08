let pin = prompt("Bienvenido, ingrese su pin");
alert("Pin ingresado correctamente" + "!");

let saldoCajaAhorros = 10000;
let saldoCuentaCorriente = 20000;
let continuar = true;

do {
    let opcion = prompt("Seleccione una opción:\n1. Verificar Saldo\n2. Retirar Dinero\n3. Depositar Dinero\n4. Salir");

    switch (opcion) {
        case "1":
            let seleccionCuenta = prompt("Seleccione una cuenta:\n1. Caja de Ahorros\n2. Cuenta Corriente");
            if (seleccionCuenta === "1") {
                verificarSaldo(saldoCajaAhorros);
            } else if (seleccionCuenta === "2") {
                verificarSaldo(saldoCuentaCorriente);
            } else {
                alert("Opción no válida. Por favor, elija una opción válida.");
            }
            break;
        case "2":
            let seleccionCuentaRetiro = prompt("Seleccione una cuenta:\n1. Caja de Ahorros\n2. Cuenta Corriente");
            if (seleccionCuentaRetiro === "1") {
                retirarDinero(saldoCajaAhorros);
            } else if (seleccionCuentaRetiro === "2") {
                retirarDinero(saldoCuentaCorriente);
            } else {
                alert("Opción no válida. Por favor, elija una opción válida.");
            }
            break;
        case "3":
            let seleccionCuentaDeposito = prompt("Seleccione una cuenta:\n1. Caja de Ahorros\n2. Cuenta Corriente");
            if (seleccionCuentaDeposito === "1") {
                depositarDinero(saldoCajaAhorros);
            } else if (seleccionCuentaDeposito === "2") {
                depositarDinero(saldoCuentaCorriente);
            } else {
                alert("Opción no válida. Por favor, elija una opción válida.");
            }
            break;
        case "4":
            alert("Gracias por utilizar nuestros servicios. ¡Hasta luego!");
            continuar = false;
            break;
        default:
            alert("Opción no válida. Por favor, elija una opción válida.");
    }
} while (continuar);

function verificarSaldo(saldo) {
    alert(`Su saldo actual es: $${saldo}`);
}

function retirarDinero(saldo) {
    const cantidadRetiro = parseFloat(prompt("Ingrese la cantidad a retirar:"));

    if (isNaN(cantidadRetiro) || cantidadRetiro <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
    } else if (cantidadRetiro > saldo) {
        alert("Saldo insuficiente.");
    } else {
        saldo -= cantidadRetiro;
        alert(`Has retirado $${cantidadRetiro}. Nuevo saldo: $${saldo}`);
    }
}

function depositarDinero(saldo) {
    const cantidadDeposito = parseFloat(prompt("Ingrese la cantidad a depositar:"));

    if (isNaN(cantidadDeposito) || cantidadDeposito <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
    } else {
        saldo += cantidadDeposito;
        alert(`Has depositado $${cantidadDeposito}. Nuevo saldo: $${saldo}`);
    }
}
