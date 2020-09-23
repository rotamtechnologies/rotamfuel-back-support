const router = require("express").Router();
require("../services/ThingsService")
router.post("/",(req,res)=>{
    agregarDispositivo(req.body.vin).then(ok=>{
        res.send(ok)
    })
});
global.ThingsController = router;
