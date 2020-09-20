const router = require("express").Router();
require("../services/ThingsService")
router.post("/",(req,res)=>{
    agregarDispositivo({body:'ola',headers:{
        head1:'val1'
        }}).then(ok=>{
        res.send(ok)
    })
});
global.ThingsController = router;
