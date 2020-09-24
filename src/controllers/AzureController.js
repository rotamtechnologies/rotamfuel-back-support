const router = require("express").Router();
require("../services/AzureService")
router.post("/",(req,res)=>{
   enviarDatosIOTHUB(req.body);
   res.send({ok:"ok"});

});

global.AzureController = router;
