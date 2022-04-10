const router = require("express").Router();
const {getById, save, deleteOne, update, get} = require("../services/FlotaMongoService");

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
        listaVehiculos: req.body.listaVehiculos,

    };
    let datos = await save(reqData)
    console.log(datos);
    res.send({datos});

});

router.patch("/:id", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        nombre: req.body.nombre,
        listaVehiculos: req.body.listaVehiculos,
    };
    let objId = req.params.id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});
router.put("/", async (req, res) => {
//validar user id proveniente para impedir modificaciones ajenas

    let reqData = {
        nombre: req.body.nombre,
        listaVehiculos: req.body.listaVehiculos,
    };
    let objId = req.body._id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});

global.MongoFlotaController = router;
