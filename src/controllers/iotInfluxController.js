const router = require("express").Router();
const {obtenerIotData} =require("../services/InfluxService");

router.get("/",async (req,res)=>{
   let reqData = {
      relativeTime:req.query.relativetime
   };
   let datosIot = await obtenerIotData(reqData)
   console.log(datosIot);

   res.send({datosIot});

});

global.IotInfluxController = router;
