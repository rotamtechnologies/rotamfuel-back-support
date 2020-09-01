const router = require("express").Router()
const express = require("express")
require('../models/KeyCloakCliente');
const path = require("path")
require('../util/JSONResponse')
var Cookies = require('cookies')
const atob = require('atob');


router.use(express.static('public'));

router.post("/token", (req, res) => {
    var cookies = new Cookies(req, res)

    console.log(req.body)
     keyCloakClient.obtenerToken(req.body.user, req.body.pass).then(tokens => {
         tokens = JSON.parse(tokens)
         if(tokens.access_token){
             /*res.set("set-cookie","RTM_FL-tkn="+tokens.access_token+";")*/
             //let fecha = new Date();
             //fecha.setMonth(10);
             cookies.set('RTM_FL-tkn', tokens.access_token,{path:"/"} )
             console.log(JSON.parse(atob(tokens.access_token.split(".")[1])))
             console.log(JSON.parse(atob(tokens.access_token.split(".")[1])).sub)
         }
         keyCloakClient.usuario('fcisternas').then(d=>{

             res.send(d);
         })
         //JSONResponse.OK(res,tokens)
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
