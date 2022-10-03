const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let freeMaticsDeviceScheme = new Schema({

    empresaId: {type: Schema.ObjectId, ref: 'empresa'},
    idDispositivo: {type: String},
    combustible: {type: String}


});

let entityMongo = mongoose.model('freematicsdevice', freeMaticsDeviceScheme)


module.exports = {
    get: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await entityMongo.find()
        } catch (e) {
            console.log(e);
        }
        return result
    },
    getById: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await entityMongo.findOne({_id:id})
        } catch (e) {
            console.log(e);
        }
        return result
    },
    save: async data => {
        console.log("guardando a" + JSON.stringify(data))
        try {
            let result = await entityMongo.create(data)
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    },

    getNoSuscritos: async () => {
        try {
            let result = await entityMongo.find({empresaId:{$exists:false}})
            console.log(result);
            return result
        } catch (e) {
            console.log(e);

        }
    },
    suscribirEmpresa: async (data,id) => {
        try {
            let result = await entityMongo.updateOne({"_id":id},{$set: {
                    empresaId: data.empresaId,
                }})
            return result

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
