const {get,getById,save,deleteOne,update} = require("../repository/freMaticsMongoDB")

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
    }
}