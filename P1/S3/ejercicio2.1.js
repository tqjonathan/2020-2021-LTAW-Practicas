/// MODULO HTTP ///

// // // Ejemplo 3: Programacion Asincrona

const http = require('http')
const PUERTO = 8080

const server = http.createServer((req,res) => {

    console.log('\nMENSAJE A')

    req.on('data', (cuerpo) => {
        console.log('MENSAJE B')
    })

    req.on('end', () => {
        console.log('MENSAJE C')

        res.setHeader('Content-Type', 'text/plain')
        res.write("Soy el Happy Server\n")
        res.end()
        
    })

    console.log('MENSAJE D')

})

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

// En la situacion 1, no se ejecuta el mensaje B, porque no hay cuerpo en la peticion (curl 127.0.0.1:8080)
// En la 2da situacion, si se ejecuta el mensaje B, ya que esta vez la peticion tiene cuerpo (curl -d "cuerpo" 127.0.0.1:8080)

