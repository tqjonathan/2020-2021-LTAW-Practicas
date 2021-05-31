// //-- Cargar las dependencias
// const socket = require('socket.io');
// const http = require('http');
// const express = require('express');
// const colors = require('colors');

// const electron = require('electron');
const ip = require('ip');
// const process = require('process');
//-- Cargar el módulo de electron
const electron = require('electron');
//-- Cargar las dependencias
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const colors = require('colors');
// const PUERTO = 8080;





//-- Crear una nueva aplciacion web
// const app = express();


//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;


//-- Crear un servidor, asosiado a la App de express
// const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
// const io = socket(server);

const PUERTO = 9000;


const tiempo = Date.now();
const fecha = new Date(tiempo);

// ******** VARIABLES *********
var users = 0;
var names = {};

// ****** MENSAJES DEL SERVER **********

let help_msg = ("Comandos Soportados:<br>" +
                "> <b>'/help'</b>: Devuelve la lista de los comandos soportados<br>" +
                "> <b>'/list'</b>: Devuelve el numero de usuarios conectados<br>" +
                "> <b>'/hello'</b>: Devuelve el saludo del servidor<br>" +
                "> <b>'/date'</b>: Devuelve la fecha actual<br>");

let hello_msg = ("¡HOLA! Gracias por unirte al chat, espero que disfrutes");

let date_msg = ("Fecha actual: <b>" + fecha.toUTCString()+ "</b>");

let error_msg = ("Comando no reconocido");


// Funciones utiles:

function isWelcome(nick) {

    let accepted = true;
    for (let id in names) {
      if (nick.toLowerCase() == names[id].toLowerCase()) {
        accepted = false;
      }
    }
    return accepted;
}

function check_command(msg){
	let data;
	if(msg == '/help'){
		data = help_msg;
	}else if(msg == '/list'){
		data = users.toString() + ' usarios conectados'
	}else if(msg == '/hello'){
		data = hello_msg;
	}else if(msg == '/date'){
		data = date_msg;
	}else{
		data = error_msg;
	};
	return(data);
  };
  

electron.app.on('ready', () => {
	
	//-- Imprimir por terminal              
	http.listen(PUERTO, () => {
		console.log('Entra al chat en: '+ ip.address() + ':' + PUERTO + '/chat.html')
	});



	//-- Definir el punto de entrada principal de mi aplicación web
	app.get('/', (req,res) => {
		res.sendFile(__dirname + '/client.html');
	});

	//-- Esto es necesario para que el servidor le envíe al cliente la
	//-- biblioteca socket.io para el cliente
	app.use('/', express.static(__dirname +'/'));


	io.on('connect', (socket) => {
	
		console.log('** NUEVA CONEXIÓN **'.yellow);

		// ******** Cliente: Init ->  Server: Welcome **********
		socket.on('init', (msg) => {

			if (isWelcome(msg)) {
			console.log(msg.red + ' joins the chat'.green);
			io.emit('msg','<strong>Server</strong>: ' + msg + ' joins the chat');
			// Incrementamos el numero de usuarios conectados
			users += 1;
			names[socket.id] = msg;
			win.webContents.send('n_users', users);
			socket.emit('welcome', '<strong>Server</strong>: Welcome, ' + msg);
			}else{
			console.log('Nick: '.green + msg.red + ' already used'.green);
			win.webContents.send('n_users', users);
			socket.emit('used', 'Nick <strong>' + msg + '</strong> is already used');
			}
		})

		// ************* Evento de desconexión del cliente *****************
		socket.on('disconnect', function(){
			if (names[socket.id]){
				console.log(names[socket.id].red + ' leaves the chat'.green);
				users -= 1;
				win.webContents.send('n_users', users);
				io.emit('msg', '<strong>Server</strong>: ' + names[socket.id] + ' leaves the chat');
				delete names[socket.id];
			}
		});

		// Mensajes recibidos de clientes
		socket.on('msg', (msg) => {
			console.log(names[socket.id].red + ": " + msg.blue);
			if (msg.startsWith('/')) {
				console.log("Recurso recibido!: " + msg.red);
				data = check_command(msg);
				win.webContents.send('msg', msg);
				socket.emit('msg', data)
			}else{
				win.webContents.send('msg', msg);
				io.emit('msg', '<strong>' + names[socket.id] + '</strong>: ' + msg);
			}
		});
	});

//-- Lanzar el servidor HTTP

	//-- Crear la ventana principal de nuestra aplicación
	win = new electron.BrowserWindow({
		width: 1920,   //-- Anchura 
		height: 1080,  //-- Altura

		//-- Permitir que la ventana tenga ACCESO AL SISTEMA
		webPreferences: {
		nodeIntegration: true,
		contextIsolation: false
		}
	});

	//-- Cargar interfaz gráfica en HTML
	win.loadFile("index.html");

    //-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
    //-- renderizado. Al recibirlos se escribe una cadena en la consola
    electron.ipcMain.handle('test', (event, msg) => {
		console.log("-> Mensaje: " + msg);
		io.send("-> Mensaje: " + msg);
    });

});