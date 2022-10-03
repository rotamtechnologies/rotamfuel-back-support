const {get,getById,save,deleteOne,update,getNoSuscritos,suscribirEmpresa} = require("../repository/freMaticsMongoDB")

module.exports = {
    getById : async  (id) =>{
        return await getById(id)
    },
    get : async  (id) =>{
        return await get(id)
    },
    save : async  (data) =>{
        return await save(data)
    },
    deleteOne : async  (id) =>{
        return await deleteOne(id)
    },
    update : async (data,id) => {
        return await update(data,id)
    },
    suscribirEmpresa : async (data,id) => {
        return await suscribirEmpresa(data,id)
    },
    getNoSuscritos : async () => {
        return await getNoSuscritos()
    },
}