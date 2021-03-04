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

// //-- Ejemplo de arrays literales

// //-- Crear una lista (array) de 4 elementos
// const a = [1,3,5,7];

// //-- Mostrar el elemento 2
// console.log("Elemento 2: " + a[2]);

// //-- Recorrer todos los elementos
// for (i in a) {
//     console.log(`a[${i}] = ${a[i]}`);
// }

// //-- Imprimir el numero total de elementos
// console.log("Cantidad de elementos: " + a.length);

// -----------------------------EJEMPLO 6
//-- Ejemplo de definicion de funciones

//-- Se definen 4 funciones sin parámetros
//-- de diferentes formar

//-- Definición clásica
// function mi_funcion1() {
//     console.log("Mi primera función");
// }

// //-- Se define una función y se asigna a una variable
// const mi_funcion2 = function() { 
//     console.log("Función como variable");
// }

// //-- Otra forma de hacer lo anterior, pero con una
// //-- notación abreviada
// const mi_funcion3 = () => {
//     console.log("Funcion abreviada....")
// }

// //-- Definición de funciones dentro de un 
// //-- objeto literal
// const a = {
//     x : 10,
//     f4 : function() {
//         console.log("Funcion dentro de un objeto");
//     },
//     f5: () => {
//         console.log("Mi funcion 5!!!");
//     }
// }

// //-- Llamando a las funciones
// mi_funcion1()
// mi_funcion2()
// mi_funcion3()
// a.f4()
// a.f5()

// ----------------------------------- EJEMPLO 7
//-- Ejemplo de paso de parametros a funciones

//-- Recibe dos parámetros y devuelve su suma
function suma(x,y) {
    //-- devolver la suma
    return x+y;
  }
  
  //-- Recibe un parámetro y lo imprime por la consola
  function mensaje(msg) {
    console.log(msg);
  }
  
  //-- Funcion que no recibe parametros
  function saluda() {
      mensaje("HOLA!!");
  }
  
  //-- Funcion que recibe una funcion como parametro
  //-- y simplemente la llama 
  function call(func) {
    console.log("--> Funcion recibida");
    //-- Llamar a la funcion pasada como argumento
    func();
  }
  
  //-- Llamar a suma
  let a = suma(2,3);
  
  //-- Probando la funcione mensaje
  mensaje("Prueba")
  mensaje(a);
  mensaje(suma(3,3))
  
  //-- Probando la funcion call
  call(saluda);
  
  //-- Se le pasa como parametro una funcion
  //-- que se define dentro de los parmatros, vez de 
  //-- fuera
  call( () => {
    mensaje("HOLI!!")
  });


  call( () => {
    mensaje(suma(3,3))
  });

