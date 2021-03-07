/// MODULO HTTP ///

// // // Ejemplo 2: Servidor que muestra el mensaje de solicitud

const http = require('http')
const PUERTO = 8080

// Imprimir informacion sobre el mensaje de solicitud

function print_info_req(req) {

    console.log('')
    console.log('Mensaje de Solicitud')
    console.log('====================')
    console.log('Método: ' + req.method)
    console.log('Recurso: ' + req.url)
    console.log('Version: ' + req.httpVersion)
    console.log('Cabeceras: ')

    // Recorre todas las cabeceras disponibles
    for (hname in req.headers)
      console.log(`  * ${hname}: ${req.headers[hname]}`);

    // Construir el objeto url con la url de la solicitud:

    const myURL = new URL(req.url, 'http://' + req.headers['host'])

    console.log('URL completa: ' + myURL.href)
    console.log('   Ruta: ' + myURL.pathname)
    
}

// Servidor: Bucle ppal de atencion a clientes

const server = http.createServer((req,res) => {
    
    // Peticion recibida e imprime la informacion de la peticion
    print_info_req(req)

    // Imprimir datos del cuerpo

    req.on('data', (cuerpo) =>{
        // los datos de cuerpo son caracteres
        req.setEncoding('utf8')

        console.log('Cuerpo: ')
        console.log(` * Tamaño: ${cuerpo.lenght} bytes `)
        console.log(` * Contenido: ${cuerpo}`)

    })


    // Se ejecuta al llegar al final del mensaje de la solicitud

    req.on('end', () => {

        console.log('Fin del mensaje.')

        // Happy Server -- Generar Respuesta
        res.setHeader ('Content-Type', 'text/plain')
        res.write('Soy el Happy Server\n')
        res.end()
    })


})

server.listen(PUERTO)

console.log("Ejemplo 2. Happy Server listo!. Escuchando en puerto: " + PUERTO);


