const bodyParser = require("body-parser");
const express = require("express");
const KeyCloakClient  = require('../models/KeyCloakCliente');
const Cookies = require('cookies');

class Middleware {
    constructor(ExpressApp) {
        this.ExpressApp = ExpressApp();
    }

    iniciar() {
        this.agregarCors();
        this.agregarParserJSON();
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
            res.set("Access-Control-Allow-Headers", "content-type,authorization,carName");
            next()
        })
    }

    agregarOAuth() {
        let keyCloakClient = new KeyCloakClient.KeyCloakCliente()
        this.ExpressApp.use((req, res, next) => {
            if (req.method==="OPTIONS" || req.url ==="/things/" || req.url ==="/azure/"
            ) {
                next()
            } else {
                var cookies = new Cookies(req, res);
                let token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length, req.headers.authorization.length) : cookies.get("RTM_FL-tkn");
                if (token) {
                    keyCloakClient.introspectToken(token).then(datosToken =>{
                        if (JSON.parse(datosToken).active) {
                            next()
                        } else {
                            res.status(401).send("Unauthorized")
                        }
                    });

                } else {
                    res.status(401).send("Unauthorized")
                }
            }
        });
        return this.ExpressApp
    }
}

global.Midleware = Middleware
