const router = require("express").Router();
router.post("/",(req,res)=>{
    res.send("aol")
})
global.ThingsController = router;
