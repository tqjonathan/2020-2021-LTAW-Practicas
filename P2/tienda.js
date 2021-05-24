// PRACTICA 2

// Modulos
const http = require('http')
const fs = require('fs')
const url = require('url');

//Defino el puerto que voy a utilizar
const PUERTO = 8080;



// Pagina principal
const MAIN = fs.readFileSync('./tienda/home.html', 'utf-8');
// Error 404
const ERROR = fs.readFileSync('./tienda/error.html', 'utf-8');

// Productos
const PRODUCT1 = fs.readFileSync('./tienda/product1.html', 'utf-8');
const PRODUCT2 = fs.readFileSync('./tienda/product2.html', 'utf-8');
const PRODUCT3 = fs.readFileSync('./tienda/product3.html', 'utf-8');

// Formularios Login
const LOGIN = fs.readFileSync('./tienda/login.html', 'utf-8');
const LOGIN_OK = fs.readFileSync('./tienda/login_ok.html', 'utf-8');
const LOGIN_KO = fs.readFileSync('./tienda/login_ko.html', 'utf-8');

// ************** Añadiendo paginas adicionales (Carrito, Login ...)
const CART = fs.readFileSync('./tienda/cart.html', 'utf-8');
const CHECKOUT = fs.readFileSync('./tienda/checkout.html', 'utf-8');
const CHECKOUT_OK = fs.readFileSync('./tienda/checkout_ok.html', 'utf-8');


// Fichero JSON
const FICHERO_JSON = "tienda.json";
const FICHERO_JSON_OUT = "tienda_mod.json";

//-- Contenido solicitado
let content;

//
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
let productos = [];
let list_productos;
let productos_carrito;

// Obtengo solo los productos del fichero JSON
prod = tienda[0]["productos"]


//-- Array de productos del json
let productos_json = []
//-- Array de descripciones
let descripcion = [];
//-- Array de precios
let precio = [];

for (i=0; i<prod.length; i++){
    nombre = Object.keys(prod[i])[0]
    descr = Object.keys(prod[i])[1]
    valor = Object.keys(prod[i])[2]

    item = prod[i]

    productos_json.push(item[nombre])
    descripcion.push(item[descr])
    precio.push(item[valor])
}


// +++++++ Creo el sevidor +++++++++++++++++

const server = http.createServer(function (req, res) {

    // console.log("Peticion Recibida");


  //-- Leer la Cookie recibida y mostrarla en la consola
	const cookie = req.headers.cookie;

//   //-- Variable para guardar el usuario
    let user;

//   //-- Variable para guardar el carrito
    // let carrito;

    // ++++++++ COOKIES +++++++++++++

    if (cookie) {
        // console.log("Cookie: " + cookie);
    
        //-- Obtener un array con todos los pares nombre-valor
        let pares = cookie.split(";");
    
        //-- Recorrer todos los pares nombre-valor
        pares.forEach((element) => {
    
          //-- Obtener los nombres y valores por separado
            let [nombre, valor] = element.split('=');
    
          //-- Leer nombres
          //-- Solo si el nombre es 'user'
            if (nombre.trim() === 'user') {
               user = valor;
              //-- Si el nombre es 'carrito'
            }else if (nombre.trim() === 'carrito') {
                carrito = valor;
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




    // //   -- Leer los parámetros
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
      //-- Añadirlos al pedido
      let pedido = {"usuario" : user,
                    "direccion" : direccion,
                    "tarjeta" : tarjeta,
                    "carrito": list_productos}

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
          content = MAIN.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>');
      }else{
          content = MAIN;
      }

    }else if (myURL.pathname == '/product1'){

      if (user) {
          content = PRODUCT1.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
          content = content.replace('<h1></h1>','<h2><a id="buy" href="/product1/add">BUY</a></h2>')
      }else{
          content = PRODUCT1;
      }

    }else if (myURL.pathname == '/product2'){

      if (user) {
        content = PRODUCT2.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
        content = content.replace('<h1></h1>','<h2><a id="buy" href="/product2/add">BUY</a></h2>')
      }else{
          content = PRODUCT2;
      }

    }else if (myURL.pathname == '/product3'){
      if (user) {
        content = PRODUCT3.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
        content = content.replace('<h1></h1>','<h2><a id="buy" href="/product3/add">BUY</a></h2>')
      }else{
          content = PRODUCT3;
      }
    
    }else if(myURL.pathname == '/product1/add' || myURL.pathname == '/product2/add' || myURL.pathname == '/product3/add'){

      // AÑADIR AL CARRITO
      productoPath = myURL.pathname.split('/')[1];
      if (productoPath == "product3"){
        producto = "Led Zeppelin"
      }else if (productoPath == "product2"){
        producto = "Chicago Bulls"
      }else{
        producto = "Iron Maiden"
      }


      // console.log(producto)

      // añade el producto a la lista de carrito
      productos.push(producto);
      // console.log(productos)

      // // añadior contador para añadir varias unidades, en este caso mantendremos siempre 1 unidad

      let productos_sum = {};
      productos.forEach(function(numero){
        productos_sum[numero] = (productos_sum[numero] || 0) + 1;
      });

      // // añadir los pedidos al json + cookies
      // console.log(productos_sum) // ITEM + Nº

      let total = '';
      let total_cookie = '';
      let list_prod = [];

      // ******************************************************
      //-- Pasar los productos sumados a string
      for (i=0; i<Object.keys(productos_sum).length; i++){
        prod = Object.keys(productos_sum)
        cant = Object.values(productos_sum)
        // formato para cookies se puede cambiar
        total += ('<h2>' + prod[i] + ': ' + cant[i] + '</h2>')
        total_cookie += (prod[i] + ': ' + cant[i] + ', ')
        //---------
        pedido = {"producto": prod[i],
                  "unidades": cant[i]}
        list_prod.push(pedido)
      }

      list_productos = list_prod;
      // console.log('PEDIDO:')
      // console.log(list_productos)
      // console.log(total)
      console.log(total_cookie)
      // console.log('PEDIDO:')
      // console.log(list_productos)

      productos_carrito = total;
      res.setHeader('Set-Cookie', "cart=" + total_cookie);
      content = CART.replace('<h2>empty</h2>', total );
      content = content.replace('<h3></h3>', "<h1><a id= 'buy' href='/checkout'>Checkout</a></h1>");

    }else if (myURL.pathname == '/login'){

        // Comprobar si existen cookies referente a un usuario - Las carga, o les envia el formulario de login
        if (user) {
            console.log("User Ya Logeado")

        }else{
            content = LOGIN
        }
        extension = "html";
    }else if (myURL.pathname == '/procesar'){

        //Con el array extraido antes de la base de datos, compara si existe un user con su password
        // y lo añade a la cookie
        if ((nombre_reg.includes(nombre)) && (password_reg.includes(password))){

            console.log('User: ' + nombre);
    
          //-- Asignar la cookie del usuario registrado
            res.setHeader('Set-Cookie', "user=" + nombre );
    
          //-- Mostramos la pagina OK
            console.log('Usuario registrado');
            content = LOGIN_OK;
            userLogin = nombre;
            content = content.replace("usuario", userLogin);
    
          }else{
            // console.log("Usuario incorrecto")
              // Si las credenciales fallan, devuelve pagina de login incorrecto
            content = LOGIN_KO;
          }   
    }else if (myURL.pathname == '/checkout'){
      content = CHECKOUT.replace('<h2>empty</h2>', productos_carrito)
    }else if (myURL.pathname == '/pay'){
      content = CHECKOUT_OK
    }else if (myURL.pathname == '/products'){

      // console.log("Peticion de Productos!")
      content_type = mime_type["json"];
  
      //-- Leer los parámetros
      let param1 = myURL.searchParams.get('param1');
  
      //-- Convertimos los caracteres alphanumericos en string
      param1 = param1.toUpperCase();
  
      // console.log("  Param: " +  param1);

      let result = [];

      //-- Para ello
      //-- Recorremos todos los productos de la base de datos
      //-- Y los que cuadren, se añaden al array
      for (let prod of productos_json) {
          //-- Pasar a mayúsculas
          prodU = prod.toUpperCase();
  
          //-- Si el producto comienza por lo indicado en el parametro
          //-- meter este producto en el array de resultados
          if (prodU.startsWith(param1)) {
              result.push(prod);
          }
      }
      //-- Imprimimos el aray de resultado de busquedas
      // console.log(result);
      busqueda = result;
      //-- Pasamos el resultado a formato JSON con stringify
      content = JSON.stringify(result);

    }else if (myURL.pathname == '/search'){

      console.log("buscando")
      product1 = ['Iron Maiden']
      product2 = ['Chicago Bulls']
      product3 = ['Led Zeppelin']

      if (busqueda[0] == null){
        content = ERROR
      }else{
        if(product1.includes(busqueda[0])){
          if (user) {
            content = PRODUCT1.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
            content = content.replace('<h1></h1>','<h2><a id="buy" href="/product1/add">BUY</a></h2>')
          }else{
              content = PRODUCT1;
          }
        }else if (product2.includes(busqueda[0])){
          if (user) {
            content = PRODUCT2.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
            content = content.replace('<h1></h1>','<h2><a id="buy" href="/product2/add">BUY</a></h2>')
          }else{
              content = PRODUCT1;
          }
        }else if (product3.includes(busqueda[0])){
          if (user) {
            content = PRODUCT3.replace('<li><a href="/login">Login</a></li>','<a href="/checkout">' + user + ' Cart</a>')
            content = content.replace('<h1></h1>','<h2><a id="buy" href="/product3/add">BUY</a></h2>')
          }else{
              content = PRODUCT3;
          }
        }else{
          content = ERROR
        }
      }

 




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