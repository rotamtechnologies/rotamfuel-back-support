const router = require("express").Router();
const {getById, save,deleteOne,update,get} = require("../services/EmpresaMongoService");

router.get("/", async (req, res) => {
    let datos = await get()
    console.log("datoss");
    res.send({datos});

});
router.get("/:id", async (req, res) => {
    let datos = await getById(req.params.id)
    console.log("datos");
    res.send({datos});

});
router.delete("/:id", async (req, res) => {
    let datos = await deleteOne(req.params.id)
    console.log(datos);
    res.send({datos});

});
router.post("/", async (req, res) => {

    let reqData = {
        nombre: req.body.nombre,
        nit: req.body.nit,
        realm: req.body.realm,
        usuario: req.body.usuario,
        clave: req.body.clave,
        correo: req.body.correo
    };
    let datos = await save(reqData)
    console.log(datos);
    res.send({datos});

});

router.patch("/:id", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        nombre: req.body.nombre,
        nit: req.body.nit,
        realm: req.body.realm,
        usuario: req.body.usuario,
        clave: req.body.clave,
        correo: req.body.correo
    };
    let objId = req.params.id
    let datos = await update(reqData,objId)
    console.log(datos);

    res.send({datos});

});
router.put("/", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        nombre: req.body.nombre,
        nit: req.body.nit,
        realm: req.body.realm,
        usuario: req.body.usuario,
        clave: req.body.clave,
        correo: req.body.correo
    };
    let objId = req.body._id
    let datos = await update(reqData,objId)
    console.log(datos);

    res.send({datos});

});

global.MongoEmpresaController = router;
