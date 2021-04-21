// Cadena con la estructura de la tienda en JSON
const tienda_json = `[
    {
        "nombre": "Alhambra II",
        "descripcion": "Placa con FPGA...",
        "stock": 3
    },
    {
        "nombre": "Icestick",
        "stock": 10
    }

]`

// Crear la estructura a partir de la cadena JSON

const tienda = JSON.parse(tienda_json);

// Mostrar información sobre la tienda
console.log("Productos en la tienda: " + tienda.length);


// Recorrer el array de productos --- Se puede utilizar la notación element.nombre o element["nombre"]
tienda.forEach((element, index) => {
    console.log("Producto: " + (index + 1) + ": " + element.nombre)
    
});