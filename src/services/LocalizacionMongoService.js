const {getById, save, deleteOne, update, get,getByViaje,getByTsAndViaje} = require("../repository/LocalizacionMongoDB")

module.exports = {
    getByViaje: async id => {
        return await getByViaje(id)
    },
    getById: async id => {
        return await getById(id)
    },
    getByTsAndViaje: async (ts,viaje) => {
        return await getByTsAndViaje(ts,viaje)
    },
    get: async () => {
        return await get()
    },
    save: async (data) => {
        return await save(data)
    },
    deleteOne: async (id) => {
        return await deleteOne(id)
    },
    update: async (data, id) => {
        return await update(data, id)
    }
}