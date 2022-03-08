const router = require("express").Router();
const {obtenerIotData} =require("../services/InfluxService");
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");

router.get("/",async (req,res)=>{

   if(!req.query.relativetime || !req.query.dato ||!req.query.patente ){
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
      username:infoUsuario.username
   };

   let datosIot = await obtenerIotData(reqData)

   res.send({datosIot});

});

global.IotInfluxController = router;
