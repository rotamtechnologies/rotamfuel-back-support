const {getIotData} = require("../repository/iotInflux")

module.exports = {
    obtenerIotData : async  (data) =>{
        return await getIotData(data)
    }
}