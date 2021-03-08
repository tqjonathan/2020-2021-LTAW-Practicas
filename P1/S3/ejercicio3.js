// Modulo fs

// Ejemplo 8: Lectura sincrona

// modulo fs
const fs = require('fs');

console.log("Lectura síncrona de un fichero");

// realizar la lectura
const data = fs.readFileSync('fich1.txt','utf8');

//-- Esta instrucción se ejecuta una vez terminada
//-- la lectura síncrona
console.log("Lectura completada...")

//-- Mostrar el contenido del fichero
console.log("Contenido del fichero: \n")
console.log(data);



