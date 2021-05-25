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

    // ******** Cliente: Init ->  Server: Welcome **********
    socket.on('init', (msg) => {

        if (isWelcome(msg)) {
          console.log(msg.red + ' joins the chat'.green);
          io.emit('msg','<strong>server</strong>: ' + msg + ' joins the chat');
          users += 1;
          names[socket.id] = msg;
          socket.emit('welcome', '<strong>Server</strong>: Welcome, ' + msg);
        } else {
          console.log('Nick: '.green + msg.red + ' already used'.green);
          socket.emit('used', 'Nick ' + "<strong>"+msg+"</strong>" + ' is already used');
        }
    })


    //-- Incrementamos el numero de usuarios conectados
    num_user += 1;

});

//-- Lanzar el servidor HTTP

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);

function isWelcome(nick) {

    let accepted = true;
    for (let id in names) {
      if (nick.toLowerCase() == names[id].toLowerCase()) {
        accepted = false;
      }
    }
    return accepted;
}
  