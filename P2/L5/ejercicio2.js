// Haz un programa en node.js que abra este fichero y muestre la siguiente información:

// Número de usuarios registrados en la tienda
// Listado con los nombres de los usuarios
// Número de productos en la tienda
// Listado de los productos de la tienda
// Número de pedidos pendientes, y los detalles del pedido


const fs = require('fs');

const FICHERO_JSON = "tienda.json";

const tienda_json = fs.readFileSync(FICHERO_JSON);

const tienda = JSON.parse(tienda_json);

// Lectura usuarios

console.log("Numero de usuarios: " + tienda.usuarios.length);

tienda.usuarios.forEach((element,index) => {
    console.log("Usuario " + (index+1) + ": " + element.nombre) 
});

// lectura Productos

console.log("\nNúmero de productos: " + tienda.productos.length);
tienda.productos.forEach((element,index) => {
    console.log("Producto " + (index+1) + ": " + 
    "\nNombre: " + element.nombre + 
    "\nDescripcion: " + element.descripcion +
    "\nStock: " + element.stock)
    
});

// Lectura pedidos

console.log("\nNúmero de pedidos: " + tienda.pedidos.length);
tienda.pedidos.forEach((element,index) => {
    console.log("Pedido " + (index+1) + ": " + 
    "\nUsuario: " + element.usuario + 
    "\nProducto: " + element.producto +
    "\nCantidad: " + element.cantidad)
});





