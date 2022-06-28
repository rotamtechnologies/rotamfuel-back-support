const router = require("express").Router();
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");
const {getById, save,deleteOne,update,get} = require("../services/ViajeMongoService");

router.get("/", async (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    let keyCloakClient = new KeyCloakClient();
    let infoUsuario = await keyCloakClient.usuario(idUser);
    let datos = await get()
    res.send({datos});
});

router.get("/:id", async (req, res) => {
    let datos = await getById(req.params.id)
    console.log("datos");
    res.send({datos});

});
router.post("/", async (req, res) => {
    let reqData = {
        "dispositivo": req.body.dispositivo,
        "vehiculo": req.body.vehiculo,
        "chofer": req.body.chofer,
        "fecha": req.body.fecha,
    }
    let datos = await save(reqData)
    res.send({datos});
});
router.patch("/:id", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        "dispositivo": req.body.dispositivo,
        "vehiculo": req.body.vehiculo,
        "chofer": req.body.chofer,
        "fechaFin": req.body.fechaFin
    };
    let objId = req.params.id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});


/*
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




router.put("/", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        patente: req.body.patente,
        year: req.body.year,
        modelo: req.body.modelo,
        marca: req.body.marca,
        tipoCombustible: req.body.tipoCombustible,
        alias: req.body.alias,
        chofer: req.body.chofer
    };
    let objId = req.body._id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});
*/
global.ViajesMongoController = router;
