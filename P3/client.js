// Init para ocultar chat hasta el registro del usuario.
function init () {
    $(document).ready(function () {
      $('#chat').hide()
    });
}
                                                                                                                                                          
const display = document.getElementById('display'); // Display chat
const msg_entry = document.getElementById('msg_entry'); //Mensaje del usuario
const name = document.getElementById('name'); 
const register = document.getElementById('register'); // Boton de registro
const send = document.getElementById('send'); // Boton de envio de mensaje
// const socket = io();


register.onclick = () => {
    if (name.value) {
    //   socket.emit('hello', name.value);
        console.log("Nuevo usuario")

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


