// Ejemplo 5 - Cliente para obtner la temperatura de Madrid

const https = require('https');

const ENDPOINT = "https://www.metaweather.com/api/location/766273/";

let request = https.get(ENDPOINT, (res) => {
    if (res.statusCode !== 200) {
        console.log("Error");
        console.log("Codigo de respuestas: " + res.statusCode);
        res.resume()
        return;
    }

    let data = "";

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('close', () => {
        console.log("Datos recibidos");
    
        // Obtener la variable con la información
        let tiempo = JSON.parse(data);
    
        let temp = tiempo.consolidated_weather[0].the_temp;
    
        console.log("Lugar: " + tiempo.title);
        console.log("Temperatura: " + temp);
        console.log("Hora: " + tiempo.time);
    });

});

