/// MODULO HTTP ///

// // // Ejemplo 4: Generando mensaje de respuesta: 200 OK

const http = require('http')
const PUERTO = 8080

const server = http.createServer((req,res) =>{


    console.log('Peticion recibida')

    // Happy Server. Genera respuesta
    // Codigo: todo Ok

    res.statusCode = 200
    res.statusMessage = 'Ok :-)'
    res.setHeader('Content-Type', 'text/plain')
    res.write('Soy el Happy Server\n')
    res.end()
})

server.listen(PUERTO)
console.log("Ejemplo 4. Happy Server listo!. Escuchando en puerto: " + PUERTO);
