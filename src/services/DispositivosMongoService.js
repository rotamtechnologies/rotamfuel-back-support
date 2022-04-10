const {getById, save, deleteOne, update, get,getByMAC} = require("../repository/DispositivosMongoDB")
const {getByUsername} = require("../repository/UserMongoDB");

module.exports = {
    getById: async id => {
        return await getById(id)
    },
    get: async () => {
        return await get()
    },
    save: async (data) => {
        const existentDisp = await getByMAC(data.MAC)
        if (existentDisp.length > 0) {
           return existentDisp[0]
        } else {
            const user = await getByUsername(data.quienRegistra)
            data.quienRegistra = user._id
            return await save(data)
        }

    },
    deleteOne: async (id) => {
        return await deleteOne(id)
    },
    update: async (data, id) => {
        return await update(data, id)
    }
}