
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
require('./constants/config');
require('./controllers/UserController');
require('./controllers/CarController');
require('./controllers/ThingsController');
require('./controllers/AuthController');
require('./controllers/ActiveMQController');
require('./controllers/EstadisticasController');
require('./controllers/EmpresaMongoController');
require('./controllers/VehiculoMongoController');
require('./controllers/FlotaMongoController');
require('./controllers/iotInfluxController');
require('./controllers/UserMongoController');
require('./controllers/CarMongoController');
require('./controllers/EstadoUltimoMongoController');
require('./controllers/DataUsersMongoController');
require('./controllers/ViajesMongoController');
require('./controllers/DispositivosMongoController');
require('./controllers/LocalizacionMongoController');
require('./middleware/Middleware');
const KeyCloakClient = require("./models/KeyCloakCliente")

const db = require("./repository/CarMeasure");
const path = require('path');
const expr = require("express");
let expressApp = {};
let middleware = {};
let keyCloakClient = {};

async function main() {

    middleware = new Midleware(expr);
    expressApp = middleware.iniciar();
    expressApp.use("/auth", AuthController);
    expressApp = middleware.agregarOAuth();
    expressApp.use("/user", UserController);
    //expressApp.use("/things", ThingsController);
    expressApp.use("/mq", ActiveMQController);
    expressApp.use("/car", CarController);
    expressApp.use("/estadisticas", EstadisticasController);
    expressApp.use("/influx/iot", IotInfluxController);
    expressApp.use("/mongo/user", MongoUserController);
    expressApp.use("/mongo/car", MongoCarController);
    expressApp.use("/mongo/empresa", MongoEmpresaController);
    expressApp.use("/mongo/estado/ultimo", MongoEstadoUltimoController);
    expressApp.use("/mongo/vehiculo", MongoVehiculoController);
    expressApp.use("/mongo/dispositivo", MongoDispositivoController);
    expressApp.use("/mongo/flota", MongoFlotaController);
    expressApp.use("/mongo/data", DataUsersMongoController);
    expressApp.use("/mongo/viajes", ViajesMongoController);
    expressApp.use("/mongo/localizacion", LocalizacionMongoController);


    expressApp.post("/results", (req, res) => {
        console.log(req.body)
        db.results(req.body.desde, req.body.hasta).then(d => {
            console.log(d[0]);
            const fields = [
                {
                    label: 'ID',
                    value: 'token',
                    default: 'nulo'
                },
                {
                    label: 'Timestamp',
                    value: '_ts',
                    default: 'nulo'
                }, {
                    label: 'Hora',
                    value: 'Hour',
                    default: 'nulo'
                }, {
                    label: 'Latitude',
                    value: 'Latitude',
                    default: 'nulo'
                }, {
                    label: 'Longitude',
                    value: 'Longitude',
                    default: 'nulo'
                },
                {
                    label: 'Engine load',
                    value: 'Calculated engine load',
                    default: 'nulo'
                },
                {
                    label: 'T-refrigerante',
                    value: 'Intake air temperature',
                    default: 'nulo'
                },
                {
                    label: 'rpm',
                    value: 'Engine RPM',
                    default: 'nulo'
                },
                {
                    label: 'Velocidad',
                    value: 'Vehicle speed',
                    default: 'nulo'
                },

                {
                    label: 'TPS',
                    value: 'Throttle position',
                    default: 'nulo'
                },
                {
                    label: 'MAF',
                    value: 'MAF air flow rate',
                    default: 'nulo'
                },
                {
                    label: 'DeltaTime',
                    value: 'DeltaTime',
                    default: 'nulo'
                },
                {
                    label: 'CumulativeTime',
                    value: 'CumulativeTime',
                    default: 'nulo'
                },
                {
                    label: 'Numero de evento',
                    value: 'Event',
                    default: 'nulo'
                }
            ];

            return downloadResource(res, 'users.csv', fields, d);

        })
    });

    expressApp.listen(CONFIG.PORTEXPRESSAPP,ok=>console.log("listen in "+CONFIG.PORTEXPRESSAPP))
}

main()
