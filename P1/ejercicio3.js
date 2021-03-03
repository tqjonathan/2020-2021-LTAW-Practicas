// SERVIDOR WEB HOLA MUNDO

// ------------Servidor 1: Deteccion de peticiones

    // Servidor basico, denominado Servidor Nulo
    // No atiende clientes, no devuelve respuestas.

const http = require ('http')

// crea el servidor
const server = http.createServer()

// Funcion de retrollamada de peticion recibida
function atender(req, res) {
    // req: http.IncomingMessage: Mensaje de solicitud
    // res: http.ServerResponse: Mensaje de respuesta  (vacio)

    //Notificacion de peticion
    console.log("Peticion recibida!!")

    // No enviamos respuesta todavia
}

//activar funcion retrollamada del servidor
server.on('request', atender)

// Activar el servidor a escucha en un puerto

server.listen(7667)







