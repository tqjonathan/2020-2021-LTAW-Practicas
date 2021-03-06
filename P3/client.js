// Init para ocultar chat hasta el registro del usuario.
function init () {
    $(document).ready(function () {
        $('#chat').hide()
    });
}
                                                                                                                                                          
const display = document.getElementById('display');
const msg = document.getElementById('msg'); 
const user = document.getElementById('name');
const register = document.getElementById('register');
const send = document.getElementById('send'); 
const line = document.getElementById('line');


//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();


// ******************* REGISTRO DE USUARIO ***************************
    // ********Mediante el boton JOIN*********
register.onclick = () => {
    if (user.value) {
        socket.emit('init', user.value);
        console.log("Nuevo usuario: " + user.value)

    }else{
        console.log("No usuario")
    }
}
    // ******** Mediante el tecla ENTER *********

user.onkeydown = (ev) => {
    switch (ev.keyCode) {
        case 13:
            if (user.value) {
                socket.emit('init', user.value);
                console.log("Nuevo usuario: " + user.value)
            }else{
                console.log("No usuario")
            }
        break;
    }
}

// ******** NICK EXISTENTE *************
socket.on('used', (msg) => {
    console.log(msg)
    line.innerHTML = msg;
    console.log("Nick already used.")
})

// **** USUARIO ACEPTADO POR EL SERVIDOR*********

socket.on('welcome', (msg) => {
    console.log("Welcome: " + user.value)
    // Funcion para ocultar panel de registro y mostrar el chat
    $(document).ready(function () {
        $('#register-panel').hide();
        $('#line').hide();
        $('#chat').show();
    })
    display.innerHTML = '> ' + msg;
})


// Mensaje recibido del server
socket.on('msg', (msg) => {
    content = '> ' + msg + '<br>' + display.innerHTML;
    display.innerHTML = content;
})


// Envio de mensajes al servidor (Enter + Click)
send.onclick = () => {
    if (msg.value){
        socket.emit('msg', msg.value);
    }
    msg.value = '';
}
    
msg.onkeydown = (ev) => {
    switch (ev.keyCode) {
        case 13:
            if (msg.value){
                socket.emit('msg', msg.value);
            }
            msg.value = '';
        break;
    }
}
    