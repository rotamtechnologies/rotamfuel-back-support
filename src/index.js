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
        console.log(req.body)
        db.results(req.body.desde,req.body.hasta).then(d => {
            const fields = [
                {
                    label: 'First Name',
                    value: 'first_name'
                },
                {
                    label: 'Last Name',
                    value: 'last_name'
                },
                {
                    label: 'Email Address',
                    value: 'email_address'
                },
                {
                    label: 'recursos',
                    value: 'resources'
                }
            ];


            //return downloadResource(res, 'users.csv', fields, d);
            console.log(d)

            res.send(d)

        })
    });
    expressApp.get("/results",(req,res)=>{
        res.send('oli')
    })


    expressApp.listen(CONFIG.PORTEXPRESSAPP);
}

main().catch(e=>{
    console.log("errora: "+e)
});
