const {getById,save,deleteOne,update,get,getByVehiculo} = require("../repository/EstadoUltimoMongoDB")

module.exports = {
    getById : async  id =>{
        return await getById(id)
    },
    getByVehiculo : async  id =>{
        return await getByVehiculo(id)
    },
    get : async  () =>{
        return await get()
    },
    save : async  (data) =>{
        return await save(data)
    },
    deleteOne : async  (id) =>{
        return await deleteOne(id)
    },
    update : async (data) => {
        return await update(data)
    }
}