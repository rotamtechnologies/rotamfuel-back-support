process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
require('./constants/config');
require('./controllers/UserController');
require('./controllers/CarController');
require('./controllers/ThingsController');
require('./controllers/AuthController');
require('./middleware/Middleware');
const db = require("./repository/CarMeasure");
const path = require('path');
const expr = require("express");
let expressApp = {};
let middleware = {};


async function main() {
    middleware = new Midleware(expr);
    expressApp = middleware.iniciar();
    expressApp.use("/auth", AuthController);
    expressApp = middleware.agregarOAuth();
    expressApp.use("/user", UserController);
    expressApp.use("/things", ThingsController);
    expressApp.use("/car", CarController);

    expressApp.post("/results", (req, res) => {
        db.results(req.body.desde, req.body.hasta).then(d => {
            const fields = [
                {
                    label: 'Timestamp',
                    value: '_ts',
                    default: 'nulo'
                }, {
                    label: 'Hora',
                    value: 'Hour',
                    default: 'nulo'
                },
                {
                    label: 'Engine load',
                    value: 'Calculated engine load',
                    default: 'nulo'
                },
                {
                    label: 'T-refrigerante',
                    value: 'temperature',
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
                    label: 'Tadm',
                    value: '',
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
                }
            ];


            return downloadResource(res, 'users.csv', fields, d.resources);

        })
    });

    expressApp.listen(CONFIG.PORTEXPRESSAPP);
}

main().catch(e => {
    console.log("errora: " + e)
});
