const {getById,save,deleteOne,update,get} = require("../repository/EmpresaMongoDB")

module.exports = {
    getById : async  (userId) =>{
        return await getById(userId)
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