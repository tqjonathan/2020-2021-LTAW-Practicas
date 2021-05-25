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

const PUERTO = 9000;

//variables

var user = 0;


// ****** MENSAJES DEL SERVER **********

// *************************************


// ****** PUNTOS DE ENTRADA DE LA APLICACION WEB **********

//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log("Solicitado acceso al chat");
  });

