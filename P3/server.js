//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

const PUERTO = 9009;

// ******** VARIABLES *********
var users = 0;
var names = {};

// *************************************



// ****** MENSAJES DEL SERVER **********

    // Por añadir


// *************************************





// ****** PUNTOS DE ENTRADA DE LA APLICACION WEB **********

//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("Solicitado acceso al chat");
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));



// *********



io.on('connect', (socket) => {
  
    console.log('** NUEVA CONEXIÓN **'.yellow);


    socket.on('init', (msg) => {
        console.log("2222222222222222222222222222");

        if (isAccepted(msg)) {
          console.log(msg.red + ' se ha unido al chat'.green);
          io.emit('msg','<strong>server</strong>: ' + msg + ' se ha unido al chat');
          users += 1;
          names[socket.id] = msg;
          socket.emit('welcome', '<strong>Server</strong>: Welcome, ' + msg);
        } else {
          console.log('usuario ' + msg.red + ' no aceptado, el nick ya esta en uso'.green);
          socket.emit('used', 'Usuario ' + msg + ' no aceptado, el nick ya esta en uso');
        }
    })


    //-- Incrementamos el numero de usuarios conectados
    // num_user += 1;
  
    // //-- Enviar mensaje de bienvenida al usuario
    // socket.send(bienv_msg);
  
    // //-- Enviar mensaje de nuevo usuario a todos los usuarios
    // io.send(conec_msg);
  
    // //-- Evento de desconexión
    // socket.on('disconnect', function(){
    //     console.log('** CONEXIÓN TERMINADA **'.yellow);
    //     //-- Decrementamos el numero de usuarios conectados
    //     num_user -= 1;
    //     //-- Enviar mensaje de desconexión de usuario a todos los usuarios
    //     io.send(desc_msg);
    // });  
  
    // //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
    // socket.on("message", (msg)=> {
    //     console.log("Mensaje Recibido!: " + msg.blue);
    //     //-- Descarto el nombre de usuario
    //     msg_text = msg.split(' ')[1];
    //     //-- Comprobar si el mensaje es un recurso
    //     if(msg_text.startsWith('/')){
    //         console.log("Recurso recibido!: " + msg_text.red);
    //         //-- Comprobamos el recurso solicitado
    //         data = check_command(msg_text);
    //         socket.send(data);
    //     }else{
    //         //-- Reenviarlo a todos los clientes conectados
    //         io.send(msg);
    //     }
    // });
});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);

function isAccepted(nick) {
    console.log("111111111111111111111111111111");

    let accepted = true;
    for (let id in names) {
      if (nick.toLowerCase() == names[id].toLowerCase()) {
        accepted = false;
      }
    }
    return accepted;
}
  