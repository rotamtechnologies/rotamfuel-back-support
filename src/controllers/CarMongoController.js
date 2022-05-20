const router = require("express").Router();
const {getByUserId, save,deleteOne,update} = require("../services/CarMongoService");
const {obtenerUsuarioMongo} = require("../services/UserMongoService");
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");

router.get("/", async (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    let keyCloakClient = new KeyCloakClient();
    let infoUsuario = await keyCloakClient.usuario(idUser);
    let usuarioMongo = await obtenerUsuarioMongo(infoUsuario.username)
    let userMongoId = usuarioMongo[0]._doc._id
    let datos = await getByUserId(userMongoId)
    console.log(datos);
    res.send({datos});

});
router.delete("/:id", async (req, res) => {
    let datos = await deleteOne(req.params.id)
    console.log(datos);
    res.send({datos});

});
router.post("/", async (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    let keyCloakClient = new KeyCloakClient();
    let infoUsuario = await keyCloakClient.usuario(idUser);
    let usuarioMongo = await obtenerUsuarioMongo(infoUsuario.username)
    let userMongoId = usuarioMongo[0]._doc._id

    let reqData = {
        userId: userMongoId,
        nombre: req.body.nombre,
        patente: req.body.patente,
        marca: req.body.marca,
        modelo: req.body.modelo,
        combustible: req.body.combustible
    };
    let datos = await save(reqData)
    console.log(datos);

    res.send({datos});

});

router.put("/", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas
    let reqData = {
        nombre: req.body.nombre,
        patente: req.body.patente,
        marca: req.body.marca,
        modelo: req.body.modelo,
        combustible: req.body.combustible
    };
    let objId = req.body._id
    let datos = await update(reqData,objId)
    console.log(datos);

    res.send({datos});

});

global.MongoCarController = router;
