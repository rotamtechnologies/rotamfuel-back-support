const router = require("express").Router();
require("../models/KeyCloakCliente");
require("../util/JSONResponse")
router.post("/",(req,res)=>{
   let tokenPeticion = tokenByReq(req,res);
   if(tokenPeticion){
      let idUser = idByToken(tokenPeticion);
      let car = {};
      keyCloakClient.createCar(idUser,car).then(ok=>{
         JSONResponse.OK(res,ok)
      })

   }else{
      JSONResponse.ERROR(res,"error token")
   }

});
router.patch("/",(req,res)=>{
   console.log(req.headers)
   console.log(req.body)
   console.log("asd")

});

router.get("/",(req,res)=>{
   let tokenPeticion = tokenByReq(req,res);
   if(tokenPeticion){
      let idUser = idByToken(tokenPeticion);
      keyCloakClient.usuario(idUser).then(ok=>{
         JSONResponse.OK(res,ok.attributes)
      })

   }else{
      JSONResponse.ERROR(res,"error token")
   }

});
global.CarController = router;
