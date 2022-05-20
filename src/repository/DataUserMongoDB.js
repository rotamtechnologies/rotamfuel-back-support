const {vehiculo} = require('../repository/VehiculoMongoDB');
const {viaje} = require('../repository/ViajesMongoDB');
module.exports = {
    getVehiculosByChofer: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await vehiculo.find({"chofer": id})
        } catch (e) {
            console.log(e);
        }
        return result
    },
    getViajesByChofer: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await viaje.find({"chofer": id})
        } catch (e) {
            console.log(e);
        }
        return result
    }
}
