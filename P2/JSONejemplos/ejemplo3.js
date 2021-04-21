// Ejemplo 1 - Elemento Tienda

// Crear una variable con la estructura definida en un fichero JSON

const fs = require('fs');

// Nombre del fichero a leer
const FICHERO_JSON = 'Ej-03-tienda-json-fich.json';

// Leer el fichero json
const tienda_json = fs.readFileSync(FICHERO_JSON);

// Crear la estructura tienda a partir del contenido del fichero
const tienda = JSON.parse(tienda_json);


// Mostrar la información de la tienda
console.log("Productos en la tienda: " + tienda.length);

// Recorrer el array de productos
tienda.forEach((element, index) => {
    console.log('Producto: ' + (index + 1) + ': ' + element['nombre'])
});




