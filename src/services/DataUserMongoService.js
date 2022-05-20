const {getVehiculosByChofer,getViajesByChofer} = require("../repository/DataUserMongoDB")
const {getByUsername} = require("../repository/UserMongoDB")
module.exports = {
    getVehiculosByChofer : async  id =>{
        const user = await getByUsername(id)
        return await getVehiculosByChofer(user.id)
    },
    getViajesByChofer : async  id =>{
        const user = await getByUsername(id)
        return await getViajesByChofer(user.id)
    }
}