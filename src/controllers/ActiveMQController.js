const router = require("express").Router();
require("../services/ActiveMQService");
require("../repository/MongoDB");
const localizacionMongoService = require("../services/LocalizacionMongoService");
const estadoUltimoMongoService = require("../services/EstadoUltimoMongoService");

router.post("/", (req, res) => {
    let dataAPersistir = req.body;
    //dataAPersistir._ts = new Date().getTime();
    let dataLocalizacion = {
        viaje: dataAPersistir?.viajeMongo,
        latitude: dataAPersistir?.Latitude,
        longitude: dataAPersistir?.Longitude,
        ts: dataAPersistir?.ts,
    }
    let estadoUltimoCar = {
        vehiculo: dataAPersistir.car,
        viaje: dataAPersistir?.viajeMongo,
        latitude: dataAPersistir?.Latitude,
        longitude: dataAPersistir?.Longitude,
        estado: "en linea",
        ultimaVelocidad: dataAPersistir["Vehicle speed"],
        chofer: dataAPersistir.userMongo,
        lastConnection: Date.now(),
    }
    localizacionMongoService.save(dataLocalizacion).then(ok => {

    })

    estadoUltimoMongoService.save(estadoUltimoCar).then(ok => {

    })

    //save(dataAPersistir)
    enviarDatosToQueue(JSON.stringify(dataAPersistir));
    res.send({ok: "ok"});

});

global.ActiveMQController = router;
