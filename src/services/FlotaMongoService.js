const {getById,save,deleteOne,update,get} = require("../repository/FlotaMongoDB")

module.exports = {
    getById : async  id =>{
        return await getById(id)
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
    update : async (data,id) => {
        return await update(data,id)
    }
}