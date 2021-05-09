// Incremente el stock de todos los productos en 1 unidad y 
// que guarde el resultado en el fichero tienda.json. 

const fs = require('fs')

const FICHERO_JSON = "tienda.json"

const tienda_json = fs.readFileSync(FICHERO_JSON)

const tienda = JSON.parse(tienda_json)

tienda.productos.forEach((element)=>{
    element["stock"]  += 1;
});

// Convertir la variable a cadena JSON
let myJSON = JSON.stringify(tienda);

// Guardar en el fichero destino
fs.writeFileSync(FICHERO_JSON, myJSON);

console.log("Información guardada en el fichero: " + FICHERO_JSON)

