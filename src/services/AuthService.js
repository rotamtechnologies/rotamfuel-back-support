const KeyCloakClient = require("../models/KeyCloakCliente").KeyCloakCliente
require("../util/Utils")
const userMongo = require("../repository/UserMongoDB")
var Cookies = require('cookies')
global.obtenerToken = (req, res) => {
    try {
        let user = req.body.user;
        let pass = req.body.pass;
        let keyCloakCliente = new KeyCloakClient()


        keyCloakCliente.obtenerToken(user, pass).then(tokens => {
            tokens = JSON.parse(tokens);
            console.log(tokens);
            console.log(tokens);
            if (tokens.access_token) {
                console.log("token");
                keyCloakCliente.introspectToken(tokens.access_token).then(datosToken => {
                    let dataT = JSON.parse(datosToken)
                    console.log(dataT.username);
                    /*userMongo.getByUsername(dataT.username).then(okUserMongo=>{
                        console.log(okUserMongo);
                        if(okUserMongo.length == 0){
                            console.log("persistir");
                            let newUser = {
                                username:dataT.username,
                                KCname:dataT.name,
                                KCId:dataT.sub,

                            }
                            userMongo.saveUsername(newUser)
                        }else{
                            console.log("no persistir")
                        }
                    })*/
                })

                var cookies = new Cookies(req, res)
                cookies.set('RTM_FL-tkn', tokens.access_token, {path: "/"})
                JSONResponse.OK(res, {tkn: tokens.access_token, rsh: tokens.refresh_token})
            } else {
                console.log("tokeno");
                console.log(tokens);

                JSONResponse.ERROR(res, tokens)
            }
        })
    } catch (e) {
        JSONResponse.ERROR(res)

    }

};
global.obtenerTokenByRealm = (req, res) => {
    try {
        let user = req.body.user;
        let pass = req.body.pass;
        let idRealm = req.body.idRealm;
        let keyCloakCliente = new KeyCloakClient()


        keyCloakCliente.obtenerTokenCustomRealm(user, pass,idRealm).then(tokens => {
            tokens = JSON.parse(tokens);
            console.log(tokens);
            console.log(tokens);
            if (tokens.access_token) {
                console.log("token");
                keyCloakCliente.introspectTokenCustomRealm(tokens.access_token,idRealm).then(datosToken => {
                    let dataT = JSON.parse(datosToken)
                    console.log(dataT);
                    console.log(dataT.username);
                    userMongo.getByUsername(dataT.username).then(okUserMongo=>{
                        console.log(okUserMongo);
                        if(!okUserMongo){
                            console.log("persistir");
                            let newUser = {
                                username:dataT.username,
                                KCname:dataT.name,
                                KCId:dataT.sub,
                                apellido:dataT.family_name,
                                nombre:dataT.given_name,
                                correo:dataT.email
                            }
                            userMongo.saveUsername(newUser)
                        }else{
                            console.log("no persistir")
                        }
                    })
                })

                var cookies = new Cookies(req, res)
                cookies.set('RTM_FL-tkn', tokens.access_token, {path: "/"})
                JSONResponse.OK(res, {tkn: tokens.access_token, rsh: tokens.refresh_token})
            } else {
                console.log("tokeno");
                console.log(tokens);
                JSONResponse.ERROR(res, tokens)
            }
        }).catch(e=>{
            JSONResponse.ERROR(res)
        })
    } catch (e) {
        JSONResponse.ERROR(res)

    }

};
global.refrescarToken = (req, res) => {
    try {
        let keyCloakCliente = new KeyCloakClient()
        let token = tokenByReq(req, res);
        keyCloakCliente.refrescarToken(token).then(tokens => {
            tokens = JSON.parse(tokens);
            if (tokens.access_token) {
                JSONResponse.OK(res, {tkn: tokens.access_token, rsh: tokens.refresh_token})
            } else {
                JSONResponse.ERROR(res, tokens)
            }
        })
    } catch (e) {
        JSONResponse.ERROR(res)

    }
}
