const router = require("express").Router();
require("../models/KeyCloakCliente");
require("../util/JSONResponse")
router.post("/", (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    if (tokenPeticion) {
        let idUser = idByToken(tokenPeticion);
        let car = {};
        keyCloakClient.createCar(idUser, car).then(ok => {
            JSONResponse.OK(res, ok)
        })

    } else {
        JSONResponse.ERROR(res, "error token")
    }

});
router.patch("/", (req, res) => {

    let tokenPeticion = tokenByReq(req, res);
    if (tokenPeticion) {
        let idUser = idByToken(tokenPeticion);
        keyCloakClient.usuario(idUser).then(ok => {
            console.log(req.body.name)
            console.log(req.body.dato.key)
            console.log(req.body.dato.value)

            if (ok.attributes[req.body.name]) {
                let datosAGuardar = ok.attributes[req.body.name];
                console.log(ok.attributes)
                let keyANum = req.body.dato.key === "regNameValue" ? 0 : req.body.dato.key === "VIN" ? 1 : req.body.dato.key === "marca" ? 2 : req.body.dato.key === "modelo" ? 3 : req.body.dato.key === "tipoCombustible" ? 4 : null;
                console.log()
                datosAGuardar[keyANum] = req.body.dato.value
                console.log(datosAGuardar)
            }
        })

    } else {
        JSONResponse.ERROR(res, "error token")
    }

});

router.delete("/", (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    if (tokenPeticion) {
        let idUser = idByToken(tokenPeticion);
        keyCloakClient.usuario(idUser).then(ok => {
            let datosParaGuardar = ok.attributes;
            console.log(datosParaGuardar);
            console.log(req.headers)
            let nombre = req.headers.carName;
            delete datosParaGuardar[nombre];
            console.log(nombre);
            console.log(datosParaGuardar);
            JSONResponse.OK(res, datosParaGuardar)
        })

    } else {
        JSONResponse.ERROR(res, "error token")
    }
});


router.get("/", (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    if (tokenPeticion) {
        let idUser = idByToken(tokenPeticion);
        keyCloakClient.usuario(idUser).then(ok => {
            JSONResponse.OK(res, ok.attributes)
        })

    } else {
        JSONResponse.ERROR(res, "error token")
    }

});
global.CarController = router;
