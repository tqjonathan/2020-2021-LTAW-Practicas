// PRACTICA 1.

//Importo los modulos 
const http = require('http')
const fs = require('fs')
const url = require('url')

//Defino el puerto que voy a utilizar
const PUERTO = 9000;


//-- Definir los tipos de mime
const mime_type = {
    "html" : "text/html",
    "css"  : "text/css",
    "js"   : "application/javascript",
    "jpg"  : "image/jpg",
    "JPG"  : "image/jpg",
    "jpeg" : "image/jpeg",
    "png"  : "image/png",
    "gif"  : "image/gif",
    "ico"  : "image/x-icon",
    "json" : "application/json",
    "ttf"  : "font/ttf"
  };
// Pagina principal
const MAIN = fs.readFileSync('./tienda/home.html', 'utf-8');
// Error 404
const ERORR = fs.readFileSync('./tienda/error.html', 'utf-8');

// Productos
const PRODUCTO1 = fs.readFileSync('./tienda/product1.html', 'utf-8');
const PRODUCTO2 = fs.readFileSync('./tienda/product2.html', 'utf-8');
const PRODUCTO3 = fs.readFileSync('./tienda/product3.html', 'utf-8');

// Formulario Login
const LOGIN = fs.readFileSync('./tienda/login.html', 'utf-8');



// ************** Añadiendo paginas adicionales (Carrito, Login ...)


// Fichero JSON
const FICHERO_JSON = ("tienda.json");
const FICHERO_JSON_OUT = "tienda-mod.json";

//-- Leer el fichero JSON
//-- de esta forma lo hacemos sincrona
const  tienda_json = fs.readFileSync(FICHERO_JSON);

//-- Crear la estructura tienda a partir del contenido del fichero
//-- nos devuelve la estructura del json
const tienda = JSON.parse(tienda_json);



// ****** USUARIOS REGISTRADOS *****

// Array con los user y Array de passwords
let nombre_reg = []; 
let password_reg = [];

//-- Recorrer el json para buscar los clientes registrados
let usuarios_reg = tienda[1]["usuarios"];

for (i = 0; i < usuarios_reg.length; i++){
    nombre_reg.push(usuarios_reg[i]["usuario"]);
    password_reg.push(usuarios_reg[i]["password"]);
};

// ******** PRODUCTOS ******************

//-- Array de productos
let productos_ = [];
let list_productos;
let productos_carrito;

// // Obtengo solo los productos del fichero JSON
productos = tienda[0]["productos"]


//-- Array de productos del json
let productos_json = []
//-- Array de descripciones
let descripcion = [];
//-- Array de precios
let precio = [];

for (i=0; i<productos.length; i++){
    nombre = Object.keys(productos[i])[0]
    descr = Object.keys(productos[i])[1]
    valor = Object.keys(productos[i])[2]

    item = productos[i]

    productos_json.push(item[nombre])
    descripcion.push(item[descr])
    precio.push(item[valor])
}
console.log(productos_json)
console.log(descripcion)
console.log(precio)









// //Creo el sevidor
// const server = http.createServer(function (req, res) {

//     console.log("Peticion Recibida");

//     //Construyo la url de la solicitud 
//     const url = new URL(req.url, 'http://' + req.headers['host']);
//         console.log("\nSe ha solicitado el recurso: " + url.pathname);

//     // Variable peticion
//     let peticion = '';
    
//     //Analisis del recurso solicitado
//     if (url.pathname == "/") {
//         peticion += "/home.html"; //petición de la pag principal 
//     } else {
//         peticion += url.pathname; //petición de cualquier otra pag
//     }

//     // Tipo de recurso solicitado
//     peticion_type = peticion.split(".")[1];

//     peticion = "./tienda" + peticion;

//     console.log("Recurso: " + peticion);
//     console.log("Extensión del recurso: " + peticion_type);

//     // Especificacion mime
//     let mime = peticion_type;

//     // Tipo HTML
//     if (peticion_type == 'html'){
//         mime = "text/html";
//     };

//     //  Tipo css
//     if (peticion_type == 'css'){
//         mime = "text/css";
//     }

//     // Tipo de img
//     if ((peticion_type == 'jpeg') || (peticion_type == 'jpg') || (peticion_type == 'ico') || (peticion_type == 'gif')){
//         mime = "image/tienda/img" + peticion_type;
//     }

//     // //Lectura asíncrona
//     fs.readFile(peticion, (err, data) => {

//         if (err){
//             res.writeHead(404,{'Content-Type': mime});
//             console.log("Not Found")
//             petition = "./tienda/error.html"
//             data =fs.readFileSync(petition)
//         } else {
//             res.writeHead(200, {'Content-Type': mime});
//             console.log("Petición aceptada, 200 OK!");
//         }
//         // Envío los datos solicitados
//         res.write(data);
//         res.end();
//         });

// });


// server.listen(PUERTO);
// console.log("Escuchando en el puerto: " + PUERTO);