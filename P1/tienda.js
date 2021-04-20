// PRACTICA 1.

//Importo los modulos 
const http = require('http')
const fs = require('fs')
const url = require('url')

//Defino el puerto que voy a utilizar
const PUERTO = 9000;

//Creo el sevidor
const server = http.createServer(function (req, res) {

    console.log("Peticion Recibida");

    //Construyo la url de la solicitud 
    const url = new URL(req.url, 'http://' + req.headers['host']);
        console.log("\nSe ha solicitado el recurso: " + url.pathname);

    // Variable peticion
    let peticion = '';
    
    //Analisis del recurso solicitado
    if (url.pathname == "/") {
        peticion += "/home.html"; //petición de la pag principal 
    } else {
        peticion += url.pathname; //petición de cualquier otra pag
    }

    // Tipo de recurso solicitado
    peticion_type = peticion.split(".")[1];

    peticion = "./tienda" + peticion;

    console.log("Recurso: " + peticion);
    console.log("Extensión del recurso: " + peticion_type);

    // Especificacion mime
    let mime = peticion_type;

    // Tipo HTML
    if (peticion_type == 'html'){
        mime = "text/html";
    };

    //  Tipo css
    if (peticion_type == 'css'){
        mime = "text/css";
    }

    // Tipo de img
    if ((peticion_type == 'jpeg') || (peticion_type == 'jpg') || (peticion_type == 'ico') || (peticion_type == 'gif')){
        mime = "image/tienda/img" + peticion_type;
    }

    // //Lectura asíncrona
    fs.readFile(peticion, (err, data) => {

        if (err){
        //Lanza error TODO
            res.writeHead(404,{'Content-Type': mime});
            console.log("Not Found")
            petition = "./tienda/error.html"
            data =fs.readFileSync(petition)
        } else {
            res.writeHead(200, {'Content-Type': mime});
            console.log("Petición aceptada, 200 OK!");
        }
        // Envío los datos solicitados
        res.write(data);
        res.end();
        });

});



server.listen(PUERTO);
console.log("Escuchando en el puerto: " + PUERTO);