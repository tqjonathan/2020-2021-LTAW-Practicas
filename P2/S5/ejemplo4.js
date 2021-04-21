// Ejemplo 4: Modificación de la tienda y escritura a un fichero

// Lectura y modificación de un fichero JSON
const fs = require('fs');

// Nombre del fichero JSON a leer
const FICHERO_JSON = "Ej-03-tienda-json-fich.json"

// Nombre del fichero JSON de salida

const FICHERO_JSON_OUT = "Ej-04-tienda-modificacion.json"

// Leer el fichero JSON

const tienda_json = fs.readFileSync(FICHERO_JSON);

// Crear la estructura tienda a partir del contenido del fichero JSON
const tienda = JSON.parse(tienda_json)

// Modifica el nombre del producto 2
tienda[1]["nombre"] = "Icebreaker"

// Mostrar informacion sobre la tienda
console.log("Productos en la tienda: " + tienda.length);

// Recorrer el array de productos

tienda.forEach((element, index) => {
    console.log("Producto: " + (index+1) + ": " + element.nombre)
});


// Convertir la variable a cadena JSON
let myJSON = JSON.stringify(tienda);

// Guardar en el fichero destino
fs.writeFileSync(FICHERO_JSON_OUT, myJSON)

console.log("Información guardada en el fichero: " + FICHERO_JSON_OUT)
