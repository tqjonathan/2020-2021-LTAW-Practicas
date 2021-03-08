/// MODULO HTTP ///

// // // Ejemplo 5: Generando mensaje de respuesta: 404 Not Found

const http = require('http')
const PUERTO = 8080

const server = http.createServer((req,res) =>{


    console.log('Peticion recibida')

    // Happy Server. Genera respuesta
    // Codigo: todo Ok

    res.statusCode = 404
    res.statusMessage = 'Not Found  :-('
    res.setHeader('Content-Type', 'text/plain')
    res.write('Soy el Angry Server\n')
    res.end()
})

server.listen(PUERTO)
console.log("Ejemplo 5. Angry Server listo!. Escuchando en puerto: " + PUERTO);
