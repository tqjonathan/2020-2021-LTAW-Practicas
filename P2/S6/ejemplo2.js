// EJEMPLO METODO POST (Los datos se envían en el cuerpo)

const http = require('http')
const fs = require('fs')
const PUERTO = 8080

// Cargar pagina web del formulario y la respuesta
const FORMULARIO = fs.readFileSync('form2.html','utf-8')
const RESPUESTA = fs.readFileSync('form1-resp.html', 'utf-8')

const server = http.createServer((req,res) => {

    // Construit el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("  Ruta: " + myURL.pathname);
    console.log("  Parametros: " + myURL.searchParams);

    // Por defecto entregar el formulario

    let content_type = "text/html"
    let content = FORMULARIO

    if (myURL.pathname == '/procesar') {
        content_type = "text/html"
        content = RESPUESTA 
    }

    req.on('data', (cuerpo) => {

        // Los datos del cuerpo son caracteres
        req.setEncoding('utf-8')
        console.log(`Cuerpo (${cuerpo.length} bytes)`)
        console.log(` ${cuerpo}`)
    })

    // Esto se ejecuta cuando llega el final del mensaje de solicitud
    req.on('end', () => {

        // Generar respuesta
        res.setHeader ('Content-Type', content_type)
        res.write(content)
        res.end()
    })

})


server.listen(PUERTO)
console.log("Escuchando en puerto: " + PUERTO)
