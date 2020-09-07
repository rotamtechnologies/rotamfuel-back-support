const router = require("express").Router();
require("../models/KeyCloakCliente");
require("../util/JSONResponse")
router.post("/",(req,res)=>{
   let tokenPeticion = tokenByReq(req,res);
   if(tokenPeticion){
      let idUser = idByToken(tokenPeticion);
      keyCloakClient.createCar().then(ok=>{
         JSONResponse.OK(res,ok)
      })

   }else{
      JSONResponse.ERROR(res,"error token")
   }

});
global.CarController = router;
