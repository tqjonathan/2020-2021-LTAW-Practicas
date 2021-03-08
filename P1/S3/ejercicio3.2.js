// Modulo fs

// Ejemplo 10: Gestion de errores - Error en lectura síncrona //////////////

const fs = require('fs');

//-- Fichero a leer
const FICHERO = 'fich1.txt';

// try {
//   const data = fs.readFileSync(FICHERO, 'utf8');
//   console.log("Lectura completada...")
//   console.log("Contenido del fichero: \n")
//   console.log(data);

// } catch (err) {
//   console.log("Error!!")
//   console.log(err.message);
// }



// Ejemplo 11: Gestion de errores - Error en lectura asíncrona //////////////

fs.readFile(FICHERO, 'utf8', (err, data) => {

    if (err) {  //-- Ha ocurrido algun error
      console.log("Error!!")
      console.log(err.message);
    } 
    else {  //-- Lectura normal
        console.log("Lectura completada...")
        console.log("Contenido del fichero: \n")
        console.log(data);
    }
})