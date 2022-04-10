const router = require("express").Router();
require("../services/ActiveMQService");
require("../repository/MongoDB");
const localizacionMongoService = require("../services/LocalizacionMongoService");

router.post("/", (req, res) => {
    let dataAPersistir = req.body;
    console.log(dataAPersistir);

    dataAPersistir._ts = new Date().getTime();
    let dataLocalizacion = {
        viaje: dataAPersistir?.viajeMongo?._id,
        latitude: dataAPersistir?.Latitude,
        longitude: dataAPersistir?.Longitude,
    }
    localizacionMongoService.save(dataLocalizacion).then(ok => {
        console.log(ok)
    })

    //save(dataAPersistir)
    enviarDatosToQueue(JSON.stringify(dataAPersistir));
    res.send({ok: "ok"});

});

global.ActiveMQController = router;
