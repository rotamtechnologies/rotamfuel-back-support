const router = require("express").Router();
require("../services/ActiveMQService");
require("../repository/MongoDB");
router.post("/",(req,res)=>{
   let dataAPersistir = req.body;
   console.log(dataAPersistir);
   save(dataAPersistir)
   enviarDatosToQueue(JSON.stringify(dataAPersistir));
   res.send({ok:"ok"});

});

global.ActiveMQController = router;
