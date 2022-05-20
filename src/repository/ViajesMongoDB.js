const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let dbScheme = new Schema({
    dispositivo: {type: Schema.ObjectId, ref: 'dispositivo'},
    vehiculo: {type: Schema.ObjectId, ref: 'vehiculo'},
    chofer: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: String},
    fechaFin: {type: String},
});
let entityMongo = mongoose.model('viaje', dbScheme)

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


                {
                    "$lookup": {
                        "from": "users",
                        "localField": "chofer",
                        "foreignField": "_id",
                        "as": "chofer"
                    },

                },
                {$unwind: '$chofer'},


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
                /* {
                     $match: {
                         _id: mongoose.Types.ObjectId(id)
                     }
                 },*/
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


                {
                    "$lookup": {
                        "from": "users",
                        "localField": "chofer",
                        "foreignField": "_id",
                        "as": "chofer"
                    },

                },
                {$unwind: '$chofer'},


            ])

        } catch (e) {
            console.log(e);
        }
        return result
    },
    save: async data => {
        data.fecha = Date.now()
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
        console.log("actualizando " + id)
        console.log(data);
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
