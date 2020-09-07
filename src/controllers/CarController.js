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

            let regACambiar = req.body.regName;
            let datosAGuardar = ok.attributes;
            console.log(req.body)
            let elReg = datosAGuardar[regACambiar];
            elReg[0] = req.body.regNameValue;
            elReg[2] = req.body.marca;
            elReg[3] = req.body.modelo;
            elReg[4] = req.body.tipoCombustible;
            console.log(datosAGuardar)
            datosAGuardar[regACambiar] = elReg;
            let data = {
                attributes: datosAGuardar
            };
            console.log(data)
            keyCloakClient.updateUser(idUser, data).then(dataOk => {
                console.log(dataOk)
            })

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
            let nombre = req.headers.carname;
            delete datosParaGuardar[nombre];
            console.log(nombre);
            console.log(datosParaGuardar);
            let data = {
                attributes: datosParaGuardar
            };

            keyCloakClient.updateUser(idUser, data).then(() => {
                JSONResponse.OK(res, datosParaGuardar)
            });

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
