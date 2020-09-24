require("../constants/config");
let cs = CONFIG.AZURECS;
let Mqtt = require('azure-iot-device-mqtt').Mqtt;
let DeviceClient = require('azure-iot-device').Client;
let Message = require('azure-iot-device').Message;

global.enviarDatosIOTHUB = (data) => {
    console.log(cs)
    let message = new Message(JSON.stringify(data))
    let client = DeviceClient.fromConnectionString(cs, Mqtt);

    console.log("enviando mensaje"+data)
    console.log(message)

    client.sendEvent(message, function (err) {
        if (err) {
            console.error('send error: ' + err.toString());
        } else {
            console.log('message sent');
        }
    });
}



