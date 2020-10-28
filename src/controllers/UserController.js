const router = require("express").Router()
const path = require("path");
require('../models/KeyCloakCliente');
require("../util/Utils");
require("../util/JSONResponse");
router.get('/descargar/datos', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));

});

router.get("/", (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    if (tokenPeticion) {
        let idUser = idByToken(tokenPeticion);
        keyCloakClient.usuario(idUser).then(info => {
            JSONResponse.OK(res, {id: idUser, datos: info});
        })
    } else {
        JSONResponse.ERROR(res, "error token")
    }
});


router.post("/actualizar", (req, res) => {

    keyCloakClient.updateUser(idByToken(tokenByReq(req, res)), req.body).then(d => {
        res.send(d);
    })
});


global.UserController = router;
