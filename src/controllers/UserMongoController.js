const router = require("express").Router();
const {obtenerUsuarioMongo, obtenerUsuariosMongo, update, deleteUsuario,getById} = require("../services/UserMongoService");

router.get("/:id", async (req, res) => {
    let userDetails = await getById(req.params.id)
    res.send({datos:userDetails});

});
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
        nombre: req.body.nombre || undefined,
        correo: req.body.correo || undefined,
        apellido: req.body.apellido || undefined,

    };
    let objId = req.body._id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});
router.patch("/:id", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        nombre: req.body.nombre == null ? undefined : req.body.nombre,
        correo: req.body.correo == null ? undefined : req.body.correo,
        apellido: req.body.apellido == null ? undefined : req.body.apellido,
    };
    console.log(reqData);
    let objId = req.params.id
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
