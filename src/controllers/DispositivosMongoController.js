const router = require("express").Router();
const {getById, save, deleteOne, update, get} = require("../services/DispositivosMongoService");
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");

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
    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    let keyCloakClient = new KeyCloakClient();
    let infoUsuario = await keyCloakClient.usuario(idUser);
    let reqData = {
        MAC: req.body.MAC,
        quienRegistra: infoUsuario.username,
        fecha: Date.now()
    };
    let datos = await save(reqData)
    console.log(datos);
    res.send({datos});

});

global.MongoDispositivoController = router;
