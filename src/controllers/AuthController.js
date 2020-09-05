const router = require("express").Router()
const express = require("express")
require('../models/KeyCloakCliente');
const path = require("path")
require('../util/JSONResponse')
var Cookies = require('cookies')
const atob = require('atob');


router.use(express.static('public'));

router.post("/token", (req, res) => {
    var cookies = new Cookies(req, res);
    console.log(req.body);
    keyCloakClient.obtenerToken(req.body.user, req.body.pass).then(tokens => {
        tokens = JSON.parse(tokens);
        if (tokens.access_token) {
            console.log(atob(tokens.access_token.split(".")[1]))
            let idUser = JSON.parse(atob(tokens.access_token.split(".")[1])).sub;
            console.log(idUser);
            keyCloakClient.usuario(idUser).then(d => {
                cookies.set('RTM_FL-tkn', tokens.access_token, {path: "/"});
                cookies.set('RTM_FL-usr', d, {path: "/"});
                console.log(d);
                JSONResponse.OK(res,d)
            }).catch(e=>{
                res.send(e)
            })
        }else{
            JSONResponse.OK(res,tokens)
        }
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
