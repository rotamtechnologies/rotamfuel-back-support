const router = require("express").Router();
const {
    get,
    getById,
    save,
    deleteOne,
    update,
    getNoSuscritos,
    suscribirEmpresa
} = require("../services/FreeMaticsMongoService");
const {getById: getEmpresa} = require("../services/EmpresaMongoService");
require("../util/httpRequester")
const btoa = require("btoa");
router.get("/", async (req, res) => {
    let datos = await get()
    console.log("datoss");
    res.send({datos});

});
router.get("/no-suscritos/", async (req, res) => {
    let datos = await getNoSuscritos()
    console.log("datos");
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

router.patch("/registrar/:id", async (req, res) => {
    let reqData = {
        empresaId: req.body.empresaId,
    };
    let objId = req.params.id
    let datos = await suscribirEmpresa(reqData, objId)
    let empresaRecord = await getEmpresa(reqData.empresaId)
    let data = {
        body: JSON.stringify({
            tipoCombustible: req.body.tipoCombustible,
            alias: req.body.alias,
        }), headers: {
            "Content-Type": "application/json",
            Authorization: "Basic cm90YW06cm90YW0uMjAyMg=="
        }
    };
    console.log(empresaRecord);
    HttpRequester.makePOST(empresaRecord[0].url+"/mongo/vehiculo/registrar/support/", data).then(ok => {
        console.log(ok);
    })

    res.send({datos, empresaRecord});

});

global.FreeMaticsController = router;
