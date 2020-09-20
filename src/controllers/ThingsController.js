const router = require("express").Router();
require("../services/ThingsService")
router.post("/",(req,res)=>{
    agregarDispositivo({body:'ola'}).then(ok=>{
        res.send(ok)
    })
});
global.ThingsController = router;
