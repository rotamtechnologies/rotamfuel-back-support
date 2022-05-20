const router = require("express").Router();
const express = require("express");
const KeyCloakClient = require('../models/KeyCloakCliente');
const path = require("path");
require('../util/JSONResponse');
const atob = require('atob');
require("../services/AuthService");

router.use(express.static('public'));


//Obtencion de token
router.post("/token", (req, res) => {
    obtenerToken(req,res);
});
//Obtencion de token customrealm
router.post("/token/realm", (req, res) => {
    obtenerTokenByRealm(req,res);
});
//Rrefrescar Token
router.get("/token", (req, res) => {
    refrescarToken(req,res);
});

//Registrar Usuario
router.post("/register", (req, res) => {
    let keyCloakCliente = new KeyCloakClient.KeyCloakCliente();
    console.log(req.body);
    keyCloakCliente.crearUsuario(req.body.user, req.body.pass, req.body.email, req.body.firstName, req.body.lastName).then(tokens => {
        console.log(tokens);
        res.json(tokens)
    })
});
router.post("/register/realm", (req, res) => {
    let keyCloakCliente = new KeyCloakClient.KeyCloakCliente();
    console.log(req.body);
    keyCloakCliente.crearUsuarioCustomRealm(req.body.user, req.body.pass, req.body.email, req.body.firstName, req.body.lastName,req.body.realm,req.body.roleName).then(tokens => {
        console.log(tokens);
        res.json(tokens)
    })
});
//Pagina de Login
router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/login.html'));

});


global.AuthController = router;
