const KeyCloakClient = require("../models/KeyCloakCliente").KeyCloakCliente

require("../util/Utils")

var Cookies = require('cookies')
global.obtenerToken = (req, res) => {
    try {
        let user = req.body.user;
        let pass = req.body.pass;
        let keyCloakCliente = new KeyCloakClient()
        keyCloakCliente.obtenerToken(user, pass).then(tokens => {
            tokens = JSON.parse(tokens);
            if (tokens.access_token) {
                console.log("token");

                var cookies = new Cookies(req, res)
                cookies.set('RTM_FL-tkn', tokens.access_token,{path:"/"} )
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
global.refrescarToken = (req, res) => {
    try {
        let keyCloakCliente = new KeyCloakClient()
        let token = tokenByReq(req,res);
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
