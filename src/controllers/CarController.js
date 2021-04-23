const router = require("express").Router();
const KeyCloakCliente = require("../models/KeyCloakCliente").KeyCloakCliente
require("../util/JSONResponse")
require("../services/ThingsService")
router.post("/", (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    if (tokenPeticion) {
        let idUser = idByToken(tokenPeticion);
        let car = {};
        let keyCloakClient = new KeyCloakCliente();
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
            console.log(datosAGuardar)
            console.log(regACambiar)
            let auxReg = datosAGuardar[regACambiar];
            delete datosAGuardar[regACambiar];
            datosAGuardar[req.body.regNameValue] = []
            datosAGuardar[req.body.regNameValue][0] = req.body.regNameValue;
            //datosAGuardar[req.body.regNameValue][1] = auxReg[1];
            datosAGuardar[req.body.regNameValue][1] = req.body.VIN;
            datosAGuardar[req.body.regNameValue][2] = req.body.marca;
            datosAGuardar[req.body.regNameValue][3] = req.body.modelo;
            datosAGuardar[req.body.regNameValue][4] = req.body.tipoCombustible;
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

router.post("/vin",(req,res)=>{
    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    console.log(req.body)
    let nombreAuto = req.body.regName;
    let vinNuevo = req.body.vinNuevo;
    let datosAntiguos = []
    keyCloakClient.usuario(idUser).then(datosUser=>{
        datosAntiguos = datosUser.attributes;
        if(datosUser.attributes[nombreAuto]){
            datosAntiguos[nombreAuto][1] = vinNuevo
            console.log(datosAntiguos)
            let data = {
                attributes: datosAntiguos
            };
            console.log(data)
            agregarDispositivo(vinNuevo).then(ok=>{
                let token = JSON.parse(ok).credentialsId
                keyCloakClient.updateUser(idUser, data).then(dataOk => {
                    console.log(dataOk)
                    JSONResponse.OK(res,dataOk)
                })
            })



        }
    })
});

router.delete("/", (req, res) => {
    let tokenPeticion = tokenByReq(req, res);
    if (tokenPeticion) {
        let idUser = idByToken(tokenPeticion);
        keyCloakClient.usuario(idUser).then(ok => {
            let datosParaGuardar = ok.attributes;
            console.log(datosParaGuardar);
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
        let keyCloakClient = new KeyCloakCliente();
        keyCloakClient.usuario(idUser).then(ok => {
            console.log({attributes:ok.attributes.attributes});
            JSONResponse.OK(res, ok.attributes)


        })

    } else {
        JSONResponse.ERROR(res, "error token")
    }

});




global.CarController = router;
