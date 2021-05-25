// Init para ocultar chat hasta el registro del usuario.
function init () {
    $(document).ready(function () {
      $('#chat').hide()
    });
}
                                                                                                                                                          
const display = document.getElementById('display'); // Display chat
const msg_entry = document.getElementById('msg_entry'); //Mensaje del usuario
const user = document.getElementById('name'); // Usuario: Nombre
const register = document.getElementById('register'); // Boton de registro
const send = document.getElementById('send'); // Boton de envio de mensaje

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();


// ******************* REGISTRO DE USUARIO ***************************
    // ********Mediante el boton JOIN*********
register.onclick = () => {
    if (user.value) {
        // Mensaje al server, con nombre de usuario.
        socket.emit('hello', user.value);
        console.log("Nuevo usuario: " + user)
        // Funcion para ocultar panel de registro y mostrar el chat
        $(document).ready(function () {
            $('#register-panel').hide();
            // $('#line').hide();
            $('#chat').show();
          })
    }else{
        console.log("No usuario")
    }
}
    // ******** Mediante el tecla ENTER *********

user.onkeydown = (ev) => {
    switch (ev.keyCode) {
        case 13:
            if (user.value) {
                socket.emit('hello', user.value);
                console.log("Nuevo usuario: " + user)
            }else{
                console.log("No usuario")
            }
        break;
    }
}

// ****************************************


// Mensaje hacia el servidor, indicando que el nick ya esta siendo usado

socket.on('used', (msg) => {
    line.innerHTML = msg;
    console.log("Nick already used.")
})


