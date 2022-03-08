const router = require("express").Router();
const {obtenerUsuarioMongo, obtenerUsuariosMongo,update,deleteUsuario} = require("../services/UserMongoService");

router.get("/", async (req, res) => {
    let reqData = {
        username: req.query.username
    };
    let datos = {}
    if (!req.query.username) {
        datos = await obtenerUsuariosMongo()

    } else {
        datos = await obtenerUsuarioMongo(reqData)
    }
    console.log(datos);

    res.send({datos});

});

router.put("/", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        apellido: req.body.apellido,

    };
    let objId = req.body._id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});
router.delete("/:id", async (req, res) => {


    let objId = req.params.id
    let datos = await deleteUsuario(objId)
    console.log(datos);

    res.send({datos});

});

global.MongoUserController = router;
