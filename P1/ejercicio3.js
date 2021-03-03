// // SERVIDOR WEB HOLA MUNDO 

// // ------------Servidor 1: Deteccion de peticiones----------------------------

//     // Servidor basico, denominado Servidor Nulo
//     // No atiende clientes, no devuelve respuestas.

// const http = require ('http')

// // crea el servidor
// const server = http.createServer()

// // Funcion de retrollamada de peticion recibida
// function atender(req, res) {
//     // req: http.IncomingMessage: Mensaje de solicitud
//     // res: http.ServerResponse: Mensaje de respuesta  (vacio)

//     //Notificacion de peticion
//     console.log("Peticion recibida!!")

//     // No enviamos respuesta todavia
// }

// //activar funcion retrollamada del servidor
// server.on('request', atender)

// // Activar el servidor a escucha en un puerto

// server.listen(7667)

// ------------------- Servidor 2: Más Compacto-------------------------------

// const http = require('http');

// //-- Definir el puerto escucha
// const PUERTO = 7667;

// //-- Función de retrollamada de petición recibida
// function atender(req, res) {
// //-- Indicamos que se ha recibido una petición
//     console.log("Petición recibida!");
// }

// //-- Crear el servidor. Se pasa como argumento la 
// //-- función de retrollamada. La función createServer()
// //-- la conecta con el evento 'request'
// const server = http.createServer(atender);

// //-- Activar el servidor: ¡Que empiece la fiesta!
// server.listen(PUERTO);

// console.log("Servidor activado. Escuchando en puerto: " + PUERTO);

// ------------------ SERVIDOR 3:  Definiendo el callback en createServer --------------------------------

// const http = require('http')
// const PUERTO = 7667

// const server = http.createServer((req,res) =>{
//     console.log("Peticion recibida")
// })

// server.listen(PUERTO)

// console.log("Servidor activado. Escuchando en puerto: " + PUERTO);


// ------------------------- Servidor 4: Happy server: Enviando respuesta -------------------------------------







