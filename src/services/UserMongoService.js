const {getByUsername} = require("../repository/UserMongoDB")

module.exports = {
    obtenerUsuarioMongo : async  (data) =>{
        return await getByUsername(data)
    }
}