const router = require("express").Router();
require("../services/EstadisticasService")
router.post("/",(req,res)=>{
   res.send("ok")
});

/*router.get("/token/:vin",(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    res.send(req.params.vin)
});*/



global.EstadisticasController = router;
