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
            var cookies = new Cookies(req, res);
            let token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length, req.headers.authorization.length) : cookies.get("RTM_FL-tkn");
            if (token) {
                keyCloakClient.introspectToken(token).then(datosToken => {
                    if (JSON.parse(datosToken).active) {
                        next()
                    } else {
                        res.send("error de auth br0")

                    }
                });

            } else {
                res.send("error de auth br0")
            }
        });
        return this.ExpressApp
    }
}

global.Midleware = Middleware
