/// MODULO URL ////



//-- Construir un objeto URL
// const myURL = new URL('https://sub.example.com:8080/p/a/t/h?query1=string1&query2=string2#hash');

// console.log(myURL)
// Accedemos a cada campo de la URL:

// const myURL = new URL('http://localhost:8080/mi_tienda/listados.html?articulo=pendrive&color=blanco#descripcion')

// //-- Imprimir la información de la URL
// console.log("  * URL completa (href): " + myURL.href)
// console.log("  * Origen: " + myURL.origin);
// console.log("    * Protocolo: " + myURL.protocol);
// console.log("    * host: " + myURL.hostname);
// console.log("    * port: " + myURL.port);
// console.log("  * Ruta: " + myURL.pathname);
// console.log("  * Busqueda: " + myURL.search);

// //-- Recorrer todas las búsquedas
// myURL.searchParams.forEach((value, name)=>{
//     console.log("      * Parametro: " + name + " = " + value);
// });


// //-- Imprimir directamente los valores de los parametros
// console.log("    * Artículo: " + myURL.searchParams.get('articulo'));
// console.log("    * Color: " + myURL.searchParams.get('color'));
// console.log("    * Otro: " + myURL.searchParams.get('otro'));


// //-- Ultima parte: Fragmento
// console.log("  * Fragmento: " + myURL.hash);


const myURL = new URL('https://www.youtube.com/watch?list=PLmnz0JqIMEzUKrrcKhBNfWbb1Th0o9tET&t=5&v=b2puPzjQ2Bo');


//-- Imprimir el objeto URL para ver todas sus partes
console.log(myURL); 

console.log('href: ' +  myURL.href)
console.log('origen: ' + myURL.origin)
console.log('protocolo: ' + myURL.protocol)
console.log('username: ' + myURL.username)
console.log('password: ' + myURL.password)
console.log('host: ' + myURL.host)
console.log('hostname: ' + myURL.hostname)
console.log('port: ' + myURL.port)
console.log('pathname: ' + myURL.pathname)
console.log('search: ' + myURL.search)
myURL.searchParams.forEach((value, name)=>{
    console.log("searchParams: " + name + " = " + value);
});
console.log('hash: ' + myURL.hash)




