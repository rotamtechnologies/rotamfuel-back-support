const router = require("express").Router()
const path = require("path");
const KeyCloakClient = require("../models/KeyCloakCliente").KeyCloakCliente
const userMongoService = require("../services/UserMongoService")
require("../util/Utils");
require("../util/JSONResponse");
router.get('/descargar/datos', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));

});

router.get("/", async (req, res) => {
    try{

        let tokenPeticion = tokenByReq(req, res);
        if (tokenPeticion) {
            let idUser = idByToken(tokenPeticion);
            let keyCloakClient = new KeyCloakClient();
            let infoUsuario = await keyCloakClient.usuario(idUser);
            let userMongo = await userMongoService.obtenerUsuarioMongo(infoUsuario.username);
            JSONResponse.OK(res, {id: idUser, datos: infoUsuario,userdb:userMongo});

        } else {
            JSONResponse.ERROR(res, "error token")
        }
    }
    catch (e) {
        JSONResponse.ERROR(res, "error "+e)

    }
});


router.post("/actualizar", (req, res) => {

    try{

        let keyCloakClient = new KeyCloakClient();
        keyCloakClient.updateUser(idByToken(tokenByReq(req, res)), req.body).then(d => {
            res.send(d);
        })
    }catch (e) {
        JSONResponse.ERROR(res, "error "+e)
    }
});


global.UserController = router;
