const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let dbScheme = new Schema({
    vehiculo: {type: Schema.ObjectId, ref: 'vehiculo'},
    viaje: {type: Schema.ObjectId, ref: 'viaje'},
    latitude: {type: String},
    longitude: {type: String},
    estado: {type: String},
    ultimaVelocidad: {type: String},
    chofer: {type: String},
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
let entityMongo = mongoose.model('ultimoEstado', dbScheme)

module.exports = {
    viaje: entityMongo,
    getById: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {

            result = await entityMongo.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                },
                {
                    "$lookup": {
                        "from": "dispositivos",
                        "localField": "dispositivo",
                        "foreignField": "_id",
                        "as": "dispositivo"
                    },

                },
                {$unwind: '$dispositivo'},

                {
                    "$lookup": {
                        "from": "vehiculos",
                        "localField": "vehiculo",
                        "foreignField": "_id",
                        "as": "vehiculo"
                    },

                },
                {$unwind: '$vehiculo'},


            ])
        } catch (e) {
            console.log(e);
        }
        return result
    },
    get: async () => {
        console.log("obteniendo todo")

        let result = []
        try {
            result = await entityMongo.aggregate([

                {
                    "$lookup": {
                        "from": "vehiculos",
                        "localField": "vehiculo",
                        "foreignField": "_id",
                        "as": "vehiculo"
                    },

                },
                {$unwind: '$vehiculo'},
                ...addRel("viaje")



            ])

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
