process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
require('./constants/config');
require('./controllers/UserController');
require('./controllers/CarController');
require('./controllers/AuthController');
require('./middleware/Middleware');
const db = require("./repository/CarMeasure");
const path = require('path');
const expr = require("express");
let expressApp = {};
let middleware = {};


async function main(){
    middleware = new Midleware(expr);
    expressApp = middleware.iniciar();
    expressApp.use("/auth", AuthController);
    expressApp = middleware.agregarOAuth();
    expressApp.use("/user", UserController);
    expressApp.use("/car", CarController);

    expressApp.post("/results", (req, res) => {
        db.results(req.body.desde,req.body.hasta).then(d => {
            res.send({
                d
            })
        })
    });
    expressApp.listen(CONFIG.PORTEXPRESSAPP);
}

main().catch(e=>{
    console.log("errora: "+e)
});
