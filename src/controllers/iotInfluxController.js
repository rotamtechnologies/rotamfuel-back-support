const router = require("express").Router();
const {obtenerIotData,descargarIotData} =require("../services/InfluxService");
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");
const {Parser: CsvParser} = require("json2csv");

router.get("/",async (req,res)=>{

   if(!req.query.viaje){
      res.send({"error":"n d"})
   }
   let tokenPeticion = tokenByReq(req, res);
   let idUser = idByToken(tokenPeticion);
   let keyCloakClient = new KeyCloakClient();
   let infoUsuario = await keyCloakClient.usuario(idUser);
   let reqData = {
      relativeTime:req.query.relativetime,
      patente:req.query.patente,
      dato:req.query.dato,
      viaje:req.query.viaje,
      username:infoUsuario.username
   };

   let datosIot = await obtenerIotData(reqData)

   res.send({datosIot});

});
router.get("/viaje/descargar",async (req,res)=>{

   if(!req.query.viaje){
      res.send({"error":"n d"})
   }

   let reqData = {
      relativeTime:req.query.relativetime,
      patente:req.query.patente,
      dato:req.query.dato,
      viaje:req.query.viaje,
      username:"infoUsuario.username"
   };

   let datosIot = await descargarIotData(reqData)
   const csvFields = [
      'Calculated engine load',
      "CumulativeTime",
      "Date",
      "DeltaTime",
      "Event",
      "Hour",
      "Intake manifold absolute pressure",
      "MAF air flow rate",
      "Throttle position",
      "Throttle position",
      "engine rpm",
      "estado",
      "vehicle speed",
   ];
   const csvParser = new CsvParser({csvFields});
   const csvData = csvParser.parse(datosIot);
   res.setHeader("Content-Type", "text/csv");
   res.setHeader("Content-Disposition", "attachment; filename=iotdata.csv");
   res.status(200).end(csvData);

});

global.IotInfluxController = router;
