const bodyParser = require("body-parser")
require('../models/KeyCloakCliente');
var Cookies = require('cookies')

class Middleware{
    ExpressApp = {}
    constructor(ExpressApp) {
        this.ExpressApp = ExpressApp()
    }
    iniciar(){
        this.agregarParserJSON()
        this.agregarCors()
        return this.ExpressApp;
    }

    agregarParserJSON(){
        this.ExpressApp.use(bodyParser.json())

    }
    agregarCors(){
        this.ExpressApp.use((req, res, next) => {
            res.set("Access-Control-Allow-Origin", "*")
            res.set("Access-Control-Allow-Headers", "content-type")


            next()
        })
    }
    agregarOAuth(){
        this.ExpressApp.use((req, res, next) => {
            var cookies = new Cookies(req, res)
            let token = cookies.get("RTM_FL-tkn");
            console.log(token)
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
