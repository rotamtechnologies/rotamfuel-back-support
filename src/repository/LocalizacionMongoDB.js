const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dbScheme = new Schema({
    latitude: {type: String},
    longitude: {type: String},
    viaje: {type: Schema.ObjectId, ref: 'viaje'},
    ts: {type: String},
}, {
    versionKey: false // You should be aware of the outcome after set to false

});
let entityMongo = mongoose.model('localizacion', dbScheme)


module.exports = {
    localizacion: entityMongo,
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
    getByTsAndViaje: async (ts,idViaje) => {
        let result = []
        try {
            result = await entityMongo.findOne({"ts": ts,"viaje":idViaje})
        } catch (e) {
            console.log(e);
        }
        return result
    },
    getByViaje: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await entityMongo.find({"viaje": id})
            /* result = await entityMongo.aggregate([
                 {
                     $match: {
                         viaje: mongoose.Types.ObjectId(id)
                     }
                 },
                 ...addRel("viaje"),
             ])*/
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
        let result = {}
        try {
            result = await entityMongo.create(data)
        } catch (e) {
            result.error = e
            console.log(e);
        }
        return result
    },
    update: async (data, id) => {
        console.log("update ")
        console.log(data)
        data = JSON.parse(JSON.stringify(data))
        console.log(data);
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
