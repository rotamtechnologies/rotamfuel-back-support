require("../constants/config");
const Stomp = require('stomp-client');
let MessageProducer = function MessageProducer(){
    this._stompClient = null;
};

let MessageConsumer = function MessageConsumer() {
};

MessageProducer.prototype.init = function init() {

    return new Promise(((resolve, reject) => {

        this._stompClient = new Stomp(CONFIG.ACTIVEMQHOST, CONFIG.ACTIVEMQPORT, 'user', 'pw');
        this._stompClient.connect(function (sessionId) {
            console.log("STOMP client connected.");
            resolve("ok")
        });

    }))

};
MessageProducer.prototype.sendMessage = function sendMessage(messageToPublish) {
    this._stompClient.publish('/queue/queue1', messageToPublish);
};

let MQ = new MessageProducer();
MQ.init();
global.enviarDatosToQueue = (data) => {

    MQ.sendMessage(data)
}





