const router = require("express").Router();
const {getById, save, deleteOne, update, get} = require("../services/EstadoUltimoMongoService");

router.get("/", async (req, res) => {
    let datos = await get()
    console.log("datoss");
    res.send({datos});
});
router.get("/:id", async (req, res) => {
    let datos = await getById(req.params.id)
    console.log("datos");
    res.send({datos});

});
router.delete("/:id", async (req, res) => {
    let datos = await deleteOne(req.params.id)
    console.log(datos);
    res.send({datos});

});
router.post("/", async (req, res) => {

    let reqData = {
        vehiculo: req.body.vehiculo,
        viaje: req.body.viaje,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        estado: req.body.estado,
        ultimaVelocidad: req.body.ultimaVelocidad,
        chofer: req.body.chofer,
        lastConnection: req.body.lastConnection
    };
    let datos = await save(reqData)
    console.log(datos);
    res.send({datos});

});

router.patch("/", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        vehiculo: req.body.vehiculo,
        viaje: req.body.viaje,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        estado: req.body.estado,
        ultimaVelocidad: req.body.ultimaVelocidad,
        chofer: req.body.chofer,
        lastConnection: req.body.lastConnection,
    };
    //let objId = req.params.id
    let datos = await update(reqData)
    console.log(datos);

    res.send({datos});

});

router.put("/", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        vehiculo: req.body.vehiculo,
        viaje: req.body.viaje,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        estado: req.body.estado,
        ultimaVelocidad: req.body.ultimaVelocidad,
        chofer: req.body.chofer
    };
    let objId = req.body._id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});

global.MongoEstadoUltimoController = router;
