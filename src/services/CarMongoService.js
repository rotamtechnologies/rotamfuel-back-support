const {getByUserId,save,deleteOne,update} = require("../repository/CarMongoDB")

module.exports = {
    getByUserId : async  (userId) =>{
        return await getByUserId(userId)
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