const router = require("express").Router()
const path = require("path");
require('../models/KeyCloakCliente');
require("../util/Utils")
router.get('/descargar/datos', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));

});

router.options("/",(req,res)=>{
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.set("Access-Control-Allow-Headers", "content-type,authorization");

    res.json({ok:"ok"})
});

router.get("/", (req, res) => {
    console.log("INFO")
    let tokenPeticion = tokenByReq(req,res);
    console.log(tokenPeticion);
    let idUser = idByToken(tokenPeticion);
    console.log(idUser)
    res.json({datos:idUser});
});


router.post("/actualizar", (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    delete req.body.id;
    console.log(req.body);
    /* keyCloakClient.updateUser(id,req.body).then(d=>{
         res.send(d);
     })*/
});


global.UserController = router;
