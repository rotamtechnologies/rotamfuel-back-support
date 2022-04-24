const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let dbScheme = new Schema({
    dispositivo: {type: Schema.ObjectId, ref: 'dispositivo'},
    vehiculo: {type: Schema.ObjectId, ref: 'vehiculo'},
    chofer: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: String},
});
let entityMongo = mongoose.model('viaje', dbScheme)

module.exports = {
    viaje: entityMongo,
    getById: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await entityMongo.find({"_id": id})
        } catch (e) {
            console.log(e);
        }
        return result
    },
    get: async () => {
        console.log("obteniendo todo")
        let result = []
        try {
            result = await entityMongo.find()
        } catch (e) {
            console.log(e);
        }
        return result
    },
    save: async data => {
        console.log("guardando " + data)
        data.fecha = Date.now()
        let result = {}
        try {
            result = await entityMongo.create(data)
            console.log(result);
        } catch (e) {
            result.error = e
            console.log(e);
        }
        return result
    },
    update: async (data, id) => {
        console.log("guardando " + data)
        data = JSON.parse(JSON.stringify(data))

        try {
            let result = await entityMongo.updateOne({"_id": id}, {$set: data})
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    },
    deleteOne: async id => {
        console.log("guardando " + id)
        try {
            let result = await entityMongo.deleteOne({"_id": id})
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    }
}