const router = require("express").Router();
router.post("/",(req,res)=>{
   console.log(req.body)
});
global.CarController = router;
