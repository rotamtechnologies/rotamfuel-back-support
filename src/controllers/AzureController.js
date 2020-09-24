const router = require("express").Router();

router.post("/",(req,res)=>{
   res.send({ok:"ok"})

});

global.AzureController = router;
