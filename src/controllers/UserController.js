const router = require("express").Router()
const path = require("path");
require('../models/KeyCloakCliente');
require("../util/Utils")
router.get('/descargar/datos', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));

});

router.get("/", (req, res) => {
    console.log("INFO")
    let tokenPeticion = tokenByReq(req,res);
    if(tokenPeticion){
        let idUser = idByToken(tokenPeticion);
        console.log(idUser)
        res.json({id:idUser});
    }else{
        res.json({error:"error token"})
    }

});


router.post("/actualizar", (req, res) => {
    console.log(req.body);
    let id = req.body.id;
    delete req.body.id;
    console.log(req.body);
    /* keyCloakClient.updateUser(id,req.body).then(d=>{
         res.send(d);
     })*/
});


global.UserController = router;
