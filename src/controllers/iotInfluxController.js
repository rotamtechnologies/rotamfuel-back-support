const router = require("express").Router();
const {obtenerIotData, descargarIotData} = require("../services/InfluxService");
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");
const {getById} = require("../services/ViajeMongoService")
const metricsFunctions = require('../metrics/getMetrics');
const {Parser: CsvParser} = require("json2csv");
const moment = require("moment");
const {parseTimestampToIso} = require('../metrics/influx/utils')
const fs = require('fs');

router.get("/", async (req, res) => {

    if (!req.query.viaje) {
        res.send({"error": "n d"})
    }
    let tokenPeticion = tokenByReq(req, res);
    let idUser = idByToken(tokenPeticion);
    let keyCloakClient = new KeyCloakClient();
    let infoUsuario = await keyCloakClient.usuario(idUser);
    let reqData = {
        relativeTime: req.query.relativetime,
        patente: req.query.patente,
        dato: req.query.dato,
        viaje: req.query.viaje,
        username: infoUsuario.username
    };


    let datosIot = await obtenerIotData(reqData)

    res.send({datosIot});

});
router.get("/viaje/descargar", async (req, res) => {
    req.socket.setTimeout(10 * 60 * 1000);
    if (!req.query.viaje) {
        res.send({"error": "n d"})
    }


    fs.access('./src/public/files/trips/' + req.query.viaje + '.csv', fs.F_OK, async (err) => {
        if (err) {
            let reqData = {
                relativeTime: req.query.relativetime,
                patente: req.query.patente,
                dato: req.query.dato,
                viaje: req.query.viaje,
                username: "infoUsuario.username"
            };

            let viajeData = await getById(reqData.viaje);
            let fechaI = moment(parseInt(viajeData[0].fecha))
            let fechaF = moment(parseInt(viajeData[0].fechaFin))
            const csvFields = [
                "events",
                'calculated_engine_load',
                "cumulativetime",
                "deltatime",
                "engine_rpm",
                "maf_air_flows_rate",
                "throttle_position",
                "vehicle_speed",
            ];
            const csvParser = new CsvParser({csvFields});
            let csvData = {}
            let dataEntera = []
            console.log(JSON.stringify(viajeData))
            console.log('lll');

            function buscarInfo() {
                return new Promise(async (resolve, reject) => {
                        reqData.startDate = fechaI.toDate().toISOString()
                        reqData.endDate = fechaF.toDate().toISOString()
                        console.log("BBB");
                        console.log(JSON.stringify(reqData));
                        let datosIot = await descargarIotData(reqData)
                        console.log("datosIot.length")
                        console.log(datosIot.length)
                        csvData = csvParser.parse(datosIot);
                        await guardarFile(reqData.viaje, csvData)
                    }
                )
            }

            buscarInfo().then(() => {
                }
            )

            return res.send('creando file');

        }
        return res.redirect('/static/files/trips/' + req.query.viaje + '.csv');

        //file exists
    })


});

router.post("/viaje/metricas/:trip", async (req, res) => {
    const {trip} = req.params;
    const params = {
        trip,
        ...req.body,
    };

    try {
        const results = await metricsFunctions.getMetrics(params);
        return res.status(200).send(results);
    } catch (error) {
        return res.status(400).send(error.toString());
    }

});

global.IotInfluxController = router;

function guardarFile(nameFile, data) {
    return new Promise((resolve, reject) => {
            fs.writeFile('./src/public/files/trips/' + nameFile + '.csv', data, err => {
                if (err) {
                    reject(err);
                }
                resolve(true);
                // file written successfully
            });
        }
    )
}