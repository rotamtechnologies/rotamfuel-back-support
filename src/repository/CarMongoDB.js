const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let carScheme = new Schema({

    userId: {type: Schema.ObjectId, ref: 'user'},
    nombre: {type: String},
    patente: {type: String},
    marca: {type: String},
    modelo: {type: String},
    combustible: {type: String}


});

let entityMongo = mongoose.model('car', carScheme)


module.exports = {
    getByUserId: async userId => {
        console.log("obteniendo " + userId)
        let result = []
        try {
            result = await entityMongo.find({userId})
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
    update: async (data,id) => {
        console.log("guardando " + data)
        try {
            let result = await entityMongo.updateOne({"_id":id},{$set:data})
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    },
    deleteOne: async idCar => {
        console.log("guardando " + idCar)
        try {
            let result = await entityMongo.deleteOne({"_id":idCar})
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    }
}
