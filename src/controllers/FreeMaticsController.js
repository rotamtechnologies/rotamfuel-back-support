const router = require("express").Router();
const {get,getById, save, deleteOne, update} = require("../services/FreeMaticsMongoService");

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
        idDispositivo: req.body.idDispositivo,
        empresaId: req.body.empresaId,
        combustible: req.body.combustible,
    };
    let datos = await save(reqData)
    console.log(datos);
    res.send({datos});

});

router.patch("/:id", async (req, res) => {
    let reqData = {
        idDispositivo: req.body.idDispositivo,
        empresaId: req.body.empresaId,
        combustible: req.body.combustible,
    };
    let objId = req.params.id
    let datos = await update(reqData, objId)
    console.log(datos);

    res.send({datos});

});

global.FreeMaticsController = router;
