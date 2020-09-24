const router = require("express").Router();
require("../services/ThingsService")
router.post("/",(req,res)=>{
    agregarDispositivo(req.body.vin).then(ok=>{
        res.send(ok)
    })
});
router.get("/token/:vin",(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    res.send(req.params.vin)
});



global.ThingsController = router;
