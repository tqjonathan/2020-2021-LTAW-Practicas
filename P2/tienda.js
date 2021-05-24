// PRACTICA 2

// Modulos
const http = require('http')
const fs = require('fs')
const url = require('url');

//Defino el puerto que voy a utilizar
const PUERTO = 9000;


// Pagina principal
const HOME = fs.readFileSync('./tienda/home.html', 'utf-8');

// Error 404
const ERROR = fs.readFileSync('./tienda/error.html', 'utf-8');

// Productos
const PRODUCT1 = fs.readFileSync('./tienda/product1.html', 'utf-8');
const PRODUCT2 = fs.readFileSync('./tienda/product2.html', 'utf-8');
const PRODUCT3 = fs.readFileSync('./tienda/product3.html', 'utf-8');

// Formularios Login y Respuestas
const LOGIN = fs.readFileSync('./tienda/login.html', 'utf-8');
const LOGIN_OK = fs.readFileSync('./tienda/login_ok.html', 'utf-8');
const LOGIN_KO = fs.readFileSync('./tienda/login_ko.html', 'utf-8');

// Carrito y Procesamiento de compra
const CART = fs.readFileSync('./tienda/cart.html', 'utf-8');
const CHECKOUT = fs.readFileSync('./tienda/checkout.html', 'utf-8');
const CHECKOUT_OK = fs.readFileSync('./tienda/checkout_ok.html', 'utf-8');

// Ficheros JSON
const FICHERO_JSON = "tienda.json";
const FICHERO_JSON_OUT = "tienda_mod.json";

//-- Contenido solicitado
let pagina;

// Variable guardar busqueda
let busqueda = [];

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

//-- Ficheros JSON
const  tienda_json = fs.readFileSync(FICHERO_JSON);
const tienda = JSON.parse(tienda_json);

// ****** USUARIOS REGISTRADOS *****

// Array con los user y passwords
let nombre_reg = [];
let password_reg = [];

// Busqueda de datos de usuarios
let usuarios_reg = tienda[1]["usuarios"];

for (i = 0; i < usuarios_reg.length; i++){
    nombre_reg.push(usuarios_reg[i]["usuario"]);
    password_reg.push(usuarios_reg[i]["password"]);
};

// ******** PRODUCTOS ******************

//-- Array de productos
let productos = [];
let list_productos;
let productos_carrito;

// Obtengo solo los productos del fichero JSON
prod = tienda[0]["productos"]


//-- Array de productos del json
let productos_json = [];

for (i=0; i<prod.length; i++){
  nombre = Object.keys(prod[i])[0]
  item = prod[i]
  productos_json.push(item[nombre])
}

// ********** SERVIDOR ***********

const server = http.createServer(function (req, res) {

  // console.log("Peticion Recibida");

  // Lectura de cookies
	const cookie = req.headers.cookie;

  //-- Variable para guardar el usuario
  let user;

  //-- Variable para guardar el carrito
  let cart;

  // ++++++++ COOKIES +++++++++++++

  if (cookie) {
    // console.log("Cookie: " + cookie);

    // Pares nombres:valor de cookies
    let pares = cookie.split(";");

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element) => {
      // Separar los pares
        let [nombre, valor] = element.split('=');
      //-- Leer nombres
        if (nombre.trim() === 'user') {
            user = valor;
        }else if (nombre.trim() === 'cart') {
            cart = valor;
        }
    });
  }

  //Construyo la url de la solicitud
  const myURL = new URL(req.url, 'http://' + req.headers['host']);
  // console.log("");
  // console.log("Método: " + req.method); //-- metodo
  // console.log("Recurso: " + req.url); //-- recurso
  // console.log("Ruta: " + myURL.pathname); //-- ruta sin parametros
  // console.log("Parametros: " + myURL.searchParams); //-- parametos separados


  //  Parametros de la url
  let nombre = myURL.searchParams.get('name');
  let password = myURL.searchParams.get('password');
  let direccion = myURL.searchParams.get('address');
  let tarjeta = myURL.searchParams.get('cardNumber');
  // console.log(" Nombre usuario: " + nombre);
  // console.log(" Password: " + password);
  // console.log(" Direccion de envio: " + direccion);
  // console.log(" Numero de Tarjeta de credito: " + tarjeta);

  //-- Comprobamos valores para el pedido
  if ((direccion != null) && (tarjeta != null)){
    // Crear pedido
    let pedido = {"usuario" : user,
                  "direccion" : direccion,
                  "tarjeta" : tarjeta,
                  "cart": list_productos}

    //-- Añadir el pedido a la tienda
    tienda[2]["pedidos"].push(pedido)

    //-- Convertir la variable a cadena JSON
    let mytienda = JSON.stringify(tienda, null, 4);

    //-- Guardarla en el fichero destino
    // console.log("añadiendo pedido")
    fs.writeFileSync(FICHERO_JSON_OUT, mytienda);
  };


  // ************ ACCESO A LAS PETICIONES *****************

  let content_type = mime_type["html"];

  if (myURL.pathname == '/'){

    if (user) {
        pagina = HOME.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>');
    }else{
        pagina = HOME;
    }

  }else if (myURL.pathname == '/product1'){

    if (user) {
        pagina = PRODUCT1.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
        pagina = pagina.replace('<h1></h1>','<h2><a id="buy" href="/product1/add">BUY</a></h2>')
    }else{
        pagina = PRODUCT1;
    }

  }else if (myURL.pathname == '/product2'){

    if (user) {
      pagina = PRODUCT2.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
      pagina = pagina.replace('<h1></h1>','<h2><a id="buy" href="/product2/add">BUY</a></h2>')
    }else{
        pagina = PRODUCT2;
    }

  }else if (myURL.pathname == '/product3'){
    if (user) {
      pagina = PRODUCT3.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
      pagina = pagina.replace('<h1></h1>','<h2><a id="buy" href="/product3/add">BUY</a></h2>')
    }else{
        pagina = PRODUCT3;
    }

  }else if(myURL.pathname == '/product1/add' || myURL.pathname == '/product2/add' || myURL.pathname == '/product3/add'){

    productoPath = myURL.pathname.split('/')[1];
    if (productoPath == "product3"){
      producto = "Led Zeppelin"
    }else if (productoPath == "product2"){
      producto = "Chicago Bulls"
    }else{
      producto = "Iron Maiden"
    }
    // console.log(producto)

    productos.push(producto);


    let productos_sum = {};
    productos.forEach(function(numero){
      productos_sum[numero] = (productos_sum[numero] || 0) + 1;
    });

    let total = '';
    let total_cookie = '';
    let list_prod = [];

    for (i=0; i<Object.keys(productos_sum).length; i++){
      prod = Object.keys(productos_sum)
      cant = Object.values(productos_sum)

      total += ('<h2>' + prod[i] + ': ' + cant[i] + '</h2>')
      total_cookie += (prod[i] + ': ' + cant[i] + ', ')

      pedido = {"producto": prod[i],
                "unidades": cant[i]}
      list_prod.push(pedido)
    }

    list_productos = list_prod;

    productos_carrito = total;
    res.setHeader('Set-Cookie', "cart=" + total_cookie);
    pagina = CART.replace('<h2>empty</h2>', total );
    pagina = pagina.replace('<h3></h3>', "<h1><a id= 'buy' href='/checkout'>Checkout</a></h1>");

  }else if (myURL.pathname == '/login'){

      // Comprobar si existen cookies referente a un usuario - Las carga, o les envia el formulario de login
      if (user) {
          console.log("User Ya Logeado")

      }else{
          pagina = LOGIN
      }
      extension = "html";
  }else if (myURL.pathname == '/procesar'){

      //Con el array extraido antes de la base de datos, compara si existe un user con su password
      // y lo añade a la cookie
      if ((nombre_reg.includes(nombre)) && (password_reg.includes(password))){

        console.log('User: ' + nombre);

        //-- Asignar la cookie del usuario registrado
        res.setHeader('Set-Cookie', "user=" + nombre );

        // console.log('Usuario registrado');
        pagina = LOGIN_OK;
        userLogin = nombre;
        pagina = pagina.replace("usuario", userLogin);

      }else{
        // console.log("Usuario incorrecto")
        // Si las credenciales fallan, devuelve pagina de login incorrectoS
        pagina = LOGIN_KO;
      }
  }else if (myURL.pathname == '/checkout'){
    pagina = CHECKOUT.replace('<h2>empty</h2>', productos_carrito)
  }else if (myURL.pathname == '/pay'){
    pagina = CHECKOUT_OK
  }else if (myURL.pathname == '/products'){

    // console.log("Peticion de Productos!")
    content_type = mime_type["json"];

    //-- Leer los parámetros
    let param1 = myURL.searchParams.get('param1');

    param1 = param1.toUpperCase();

    let result = [];

    // Busca el producto en la lista y lo añade al array
    for (let prod of productos_json) {
        //-- Pasar a mayúsculas
        prodU = prod.toUpperCase();

        // Si coincide con lo introducido lo añade al resultado
        if (prodU.startsWith(param1)) {
            result.push(prod);
        }
    }
    // console.log(result);
    busqueda = result;
    //-- Pasamos el resultado a formato JSON con stringify
    pagina = JSON.stringify(result);

  }else if (myURL.pathname == '/search'){

    // console.log("buscando")
    product1 = ['Iron Maiden']
    product2 = ['Chicago Bulls']
    product3 = ['Led Zeppelin']

    if (busqueda[0] == null){
      pagina = ERROR
    }else{
      if(product1.includes(busqueda[0])){
        if (user) {
          pagina = PRODUCT1.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
          pagina = pagina.replace('<h1></h1>','<h2><a id="buy" href="/product1/add">BUY</a></h2>')
        }else{
            pagina = PRODUCT1;
        }
      }else if (product2.includes(busqueda[0])){
        if (user) {
          pagina = PRODUCT2.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
          pagina = pagina.replace('<h1></h1>','<h2><a id="buy" href="/product2/add">BUY</a></h2>')
        }else{
            pagina = PRODUCT1;
        }
      }else if (product3.includes(busqueda[0])){
        if (user) {
          pagina = PRODUCT3.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
          pagina = pagina.replace('<h1></h1>','<h2><a id="buy" href="/product3/add">BUY</a></h2>')
        }else{
            pagina = PRODUCT3;
        }
      }else{
        pagina = ERROR
      }
    }

    // limpiar variable de busqueda
    busqueda = []

  }else{

      extension = myURL.pathname.split('.')[1]
      path = myURL.pathname.split('/');
      if (path.length > 2) {
        file = path[path.length-1]
        if (path.length == 3){
          if (path[1].startsWith('product')){
            filename = "./tienda/" + file
          }else{
            filename = "./tienda/" + path[1] + '/' + file
          }
        }else{
          filename = "./tienda/" + path[2] + '/' + file
        }
      }else{
        filename = "./tienda/" + myURL.pathname.split('/')[1];
      }

      fs.readFile(filename, (err, data) => {
        //-- Devolver pagina de error - 404 NOT FOUND
          if (err){
              res.writeHead(404,{'pagina-Type': content_type});
              res.write(ERROR);
              res.end();
          }else{
            //-- Todo correcto
              content_type = mime_type[extension];
              res.setHeader('pagina-Type', content_type);
              res.write(data);
              res.end();
          }
      });
      return;
  }

  // ****************************************************
  res.setHeader('pagina-Type', content_type);
  res.write(pagina);
  res.end();

});

server.listen(PUERTO);
console.log("Escuchando en el puerto: " + PUERTO);