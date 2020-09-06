const router = require("express").Router()
const express = require("express")
require('../models/KeyCloakCliente');
const path = require("path")
require('../util/JSONResponse')
var Cookies = require('cookies')
const atob = require('atob');


router.use(express.static('public'));


//Obtencion de token
router.post("/token", (req, res) => {
    var cookies = new Cookies(req, res);
    keyCloakClient.obtenerToken(req.body.user, req.body.pass).then(tokens => {
        console.log(tokens)
        send.response(tokens)
    })
});
router.post("/register", (req, res) => {
    console.log(req.body)
    keyCloakClient.crearUsuario(req.body.user, req.body.pass, req.body.email, req.body.firstName, req.body.lastName).then(tokens => {
        console.log(tokens)
        res.json(tokens)
    })
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/login.html'));

});


global.AuthController = router;
