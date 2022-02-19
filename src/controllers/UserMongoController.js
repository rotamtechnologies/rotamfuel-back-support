const router = require("express").Router();
const {obtenerUsuarioMongo} =require("../services/UserMongoService");

router.get("/",async (req,res)=>{
   let reqData = {
      username:req.query.username
   };
   if(!req.query.username){
      res.send({"error":"n u"})
   }
   let datos = await obtenerUsuarioMongo(reqData)
   console.log(datos);

   res.send({datos});

});

global.MongoUserController = router;
