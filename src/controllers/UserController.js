const router = require("express").Router()
const path = require("path");
require('../models/KeyCloakCliente');

router.get('/descargar/datos', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));

});

router.post("/actualizar",(req,res)=>{

    console.log(req.body)
    res.send("ok")
});


global.UserController = router;
