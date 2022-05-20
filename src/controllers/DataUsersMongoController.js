const router = require("express").Router();
const {getVehiculosByChofer,getViajesByChofer} = require("../services/DataUserMongoService");
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");

router.get("/vehiculos/", async (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    let keyCloakClient = new KeyCloakClient();
    let infoUsuario = await keyCloakClient.usuario(idUser);
    let datos = await getVehiculosByChofer(infoUsuario.username)
    res.send({datos});
});
router.get("/viajes/", async (req, res) => {

    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    let keyCloakClient = new KeyCloakClient();
    let infoUsuario = await keyCloakClient.usuario(idUser);
    let datos = await getViajesByChofer(infoUsuario.username)
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
router.post("/", async (req, res) => {

    let reqData = {
        patente: req.body.patente,
        year: req.body.year,
        modelo: req.body.modelo,
        marca: req.body.marca,
        tipoCombustible: req.body.tipoCombustible,
        alias: req.body.alias,
        chofer: req.body.chofer
    };
    let datos = await save(reqData)
    console.log(datos);
    res.send({datos});

});

router.patch("/:id", async (req, res) => {
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
    let objId = req.params.id
    let datos = await update(reqData, objId)
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
global.DataUsersMongoController = router;
