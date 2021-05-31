const electron = require('electron');
var ip = require("ip");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const info4 = document.getElementById("info4");
const info5 = document.getElementById("info5");
const info6 = document.getElementById("info6");
const info7 = document.getElementById("info7");
const n_users = document.getElementById("n_users");
const msg = document.getElementById("msg");

//-- Acceder a la API de node para obtener la info
info1.textContent = process.versions.node;
info2.textContent = process.versions.chrome;
info3.textContent = process.versions.electron;
info4.textContent = process.arch;
info5.textContent = process.platform;
info6.textContent = process.cwd();
info7.textContent = ip.address() + ":9000/chat.html";

btn_test.onclick = () => {
    display.innerHTML = "Mesaje de prueba! " + '<br>' + display.innerHTML;
    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('n_users', (event, message) => {
    n_users.textContent = message;
});

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('msg', (event, text) => {
    msg.textContent = '> ' + text + '<br>' + display.innerHTML;
    display.innerHTML = msg.textContent;
});
