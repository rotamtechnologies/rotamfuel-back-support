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

           console.log(req.body)


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
              attributes:datosParaGuardar
           };

           keyCloakClient.updateUser(idUser,data).then(()=>{
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
