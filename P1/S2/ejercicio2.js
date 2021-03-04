// ........... TEMPORIZADOR

// Funcion a ejecutar tras un tiempo(ms)
function test1() {
    console.log("Test1")
}

// pasar la funcion existente (test1)
setTimeout (test1, 1000)

// definir la funcion directamente en el parametro
setTimeout(() => {
    console.log("Test 2")
},2000)


console.log("Terminadon Test_1y2")


// temporizador ejecuta funcion cada t(ms) en bucle.
let waiting = setInterval(() => {
    console.log("Tic...")
}, 200);

// desactivar temportizador tras t(ms)
setTimeout(() => {
    clearInterval(waiting)
    console.log("Stop")
    
}, 3000);