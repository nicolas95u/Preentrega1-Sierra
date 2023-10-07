 let pin = prompt("Bienvenido, ingrese su pin");
 alert("Pin ingresado correctamente" + "!");

let texto = prompt ("Indique divisa a retirar");
let texto2 = prompt ("Caja de ahorros o Cuenta corriente ");


let saldo = 10000;
let continuar = true;

do {
    let opcion = prompt("Seleccione una opción:\n1. Verificar Saldo\n2. Retirar Dinero\n3. Depositar Dinero\n4. Salir");

    switch (opcion) {
        case "1":
            verificarSaldo();
            function verificarSaldo() {
                alert(`Su saldo actual es: $${saldo}`);
            }
            
            break;
        case "2":
            retirarDinero();
            function retirarDinero() {
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
            break;
        case "3":
            depositarDinero();
            function depositarDinero() {
                const cantidadDeposito = parseFloat(prompt("Ingrese la cantidad a depositar:"));
            
                if (isNaN(cantidadDeposito) || cantidadDeposito <= 0) {
                    alert("Por favor, ingrese una cantidad válida.");
                } else {
                    saldo += cantidadDeposito;
                    alert(`Has depositado $${cantidadDeposito}. Nuevo saldo: $${saldo}`);
                }
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


