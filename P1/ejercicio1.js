//-- Programa Hola mundo en Node.js

/* Este es un ejemplo de comentario multilínea
   El objeto console está disponible directamente
   desde node.js, sin tener que importar nada */

// -----------------------EJEMPLO 1

// //-- Imprimir un mensaje en la consola
// console.log("¡Hola Mundo!");

// // -------------------EJEMPLO 2


// //-- Variable numérica
// let n = 3;

// //-- Imprimir la variable directamente
// console.log("Variable n: ", n);

// //-- Valor de la variable dentro de una cadena
// console.log(`Variable n: ${n} metros`);

// //-- Concatenar la variable al mensaje
// console.log("Variable n: " + n);

// //--------------------------- EJEMPLO 3

// //-- Ejemplo de bucles

// //-- Definiendo una constante: Número de mensajes
// const N = 10; 

// //-- Bucle para imprimir N mensajes
// for (i = 0; i < N; i++) {
//     console.log("Mensaje " + i);
// }

// --------------------------------EJEMPLO 4

//-- Ejemplo de definición y uso de objetos literales

//-- Definiendo un objeto con varias propiedades y valores
// const objeto1 = {
//     nombre: "Objeto-1",
//     valor: 10,
//     test: true
// };

// //-- Imprimiendo las propiedades del objeto
// console.log("Nombre: " + objeto1.nombre);
// console.log("Valor: " + objeto1.valor);
// console.log("Test: " + objeto1.test);

// //-- También te puedes referir a las propiedades
// //-- usando su nombre entre comillas
// console.log("");
// console.log("Nombre: " + objeto1["nombre"]);
// console.log("Valor: " + objeto1["valor"]);
// console.log("Test: " + objeto1["test"]);

// //-- Comprobar si un objeto tiene una propiedad
// if ("t3st" in objeto1) {
//     console.log("\nTiene propiedad test");
// }else{
//     console.log("\nNo tiene esa propidead");
// }

// //-- Recorrer todas las propiedades
// console.log("");
// for (prop in objeto1) {
//     console.log(`Propiedad: ${prop} --> Valor: ${objeto1[prop]}`);
// }

// //-- Forma abreviada para obtener constantes
// //-- con las propiedades del objeto
// const { valor, nombre } = objeto1;

// console.log("");
// console.log("Nombre: " + nombre);
// console.log("Valor: " + valor);


// ------------------------------EJMPLO 5

//-- Ejemplo de arrays literales

//-- Crear una lista (array) de 4 elementos
const a = [1,3,5,7];

//-- Mostrar el elemento 2
console.log("Elemento 2: " + a[2]);

//-- Recorrer todos los elementos
for (i in a) {
    console.log(`a[${i}] = ${a[i]}`);
}

//-- Imprimir el numero total de elementos
console.log("Cantidad de elementos: " + a.length);