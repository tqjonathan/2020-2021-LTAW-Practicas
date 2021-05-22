// PRACTICA 2

//Importo los modulos
const http = require('http')
const fs = require('fs')
const url = require('url')

//Defino el puerto que voy a utilizar
const PUERTO = 8080;


// VARIABLES ****

//-- Variable pagina principal
let main_pag;

//-- Contenido solicitado
let content;

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
const ERROR = fs.readFileSync('./tienda/error.html', 'utf-8');

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





// +++++++ Creo el sevidor +++++++++++++++++

const server = http.createServer(function (req, res) {

    // console.log("Peticion Recibida");


//   //-- Leer la Cookie recibida y mostrarla en la consola
//   const cookie = req.headers.cookie;

//   //-- Variable para guardar el usuario
//   let user;

//   //-- Variable para guardar el carrito
//   let carrito;



    //Construyo la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("");
    console.log("Método: " + req.method); //-- metodo
    console.log("Recurso: " + req.url); //-- recurso
    console.log("Ruta: " + myURL.pathname); //-- ruta sin parametros
    console.log("Parametros: " + myURL.searchParams); //-- parametos separados




      //-- Leer los parámetros
    // let nombre = myURL.searchParams.get('nombre');
    // let password = myURL.searchParams.get('password');
    // let direccion = myURL.searchParams.get('direccion');
    // let tarjeta = myURL.searchParams.get('tarjeta');
    // console.log(" Nombre usuario: " + nombre);
    // console.log(" Password: " + password);
    // console.log(" Direccion de envio: " + direccion);
    // console.log(" Numero de Tarjeta de credito: " + tarjeta);



    // ************ ACCESO A LAS PETICIONES *****************

    let content_type = mime_type["html"];

    if (myURL.pathname == '/'){

        content = MAIN;

        // myURL.pathname = "/home.html"
        // main_pag = content;

    }else if (myURL.pathname == '/producto1'){
        content = PRODUCTO1;

    }else if (myURL.pathname == '/producto2'){
        content = PRODUCTO2;

    }else if (myURL.pathname == '/producto3'){
        content = PRODUCTO3;

    }else if (myURL.pathname == '/login'){

        // Comprobar si existen cookies referente a un usuario - Las carga, o les envia el formulario de login
        if (user) {
            console.log("User Ya Logeado")

        }else{
            content = LOGIN
        }
        extension = "html";
    }else{

        extension = myURL.pathname.split('.')[1]


        filePath = "./tienda" + myURL.pathname

        console.log(filePath)

        fs.readFile(filePath, (err, data) => {
          //-- Controlar si la pagina es no encontrada.
          //-- Devolver pagina de error personalizada, 404 NOT FOUND
            if (err){
                res.writeHead(404,{'Content-Type': content_type});
                res.write(ERROR);
                res.end();
            }else{
              //-- Todo correcto
                content_type = mime_type[extension];
                res.setHeader('Content-Type', content_type);
                res.write(data);
                res.end();
            }
        });
        return;
    }

    // ****************************************************
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end();

});


server.listen(PUERTO);
console.log("Escuchando en el puerto: " + PUERTO);