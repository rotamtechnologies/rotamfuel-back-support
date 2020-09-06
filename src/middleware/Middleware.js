const bodyParser = require("body-parser");
const express = require("express");
require('../models/KeyCloakCliente');
const Cookies = require('cookies');

class Middleware {
    ExpressApp = {};

    constructor(ExpressApp) {
        this.ExpressApp = ExpressApp();
    }

    iniciar() {
        this.agregarParserJSON();
        this.agregarCors();
        // this.servirArchivos()
        return this.ExpressApp;
    }

    servirArchivos() {
        this.ExpressApp.use(express.static('public'));
    }

    agregarParserJSON() {
        this.ExpressApp.use(bodyParser.json());
    }

    agregarCors() {
        this.ExpressApp.use((req, res, next) => {
            res.set("Access-Control-Allow-Origin", "*");
            res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            res.set("Access-Control-Allow-Headers", "content-type,authorization");
            next()
        })
    }

    agregarOAuth() {
        this.ExpressApp.use((req, res, next) => {
            console.log("Oauth")
            var cookies = new Cookies(req, res);
            console.log(req.headers);
            let token = req.headers.authorization ? req.headers.authorization : cookies.get("RTM_FL-tkn");
            console.log(token);
            if (token) {
                console.log(token);
                keyCloakClient.introspectToken(token).then(datosToken => {
                    console.log(datosToken);
                    next()
                });

            } else {
                res.send("error de auth br0")
            }
        });
        return this.ExpressApp
    }
}

global.Midleware = Middleware
