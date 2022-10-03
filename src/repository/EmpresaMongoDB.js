const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dbScheme = new Schema({

    nombre: {type: String},
    nit: {type: String},
    realm: {type: String},
    usuario: {type: String},
    clave: {type: String},
    KC_key: {type: String},
    url: {type: String},
    correo: {type: String}
});

let entityMongo = mongoose.model('empresa', dbScheme)


module.exports = {
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
    getByRealm: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await entityMongo.find({"realm": id})
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
        try {
            let result = await entityMongo.create(data)
            console.log(result);
        } catch (e) {
            console.log(e);

        }
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
