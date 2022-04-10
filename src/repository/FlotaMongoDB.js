const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersRepository = require("../repository/UserMongoDB")
let dbScheme = new Schema({
    nombre: {type: String},
    listaVehiculos: [Schema.Types.ObjectId]
});

let entityMongo = mongoose.model('flota', dbScheme)


module.exports = {
    getById: async id => {
        console.log("obteniendo " + id)
        let result = []
        try {
            result = await entityMongo.aggregate([
                {
                    "$lookup": {
                        "from": "vehiculos",
                        "localField": "listaVehiculos",
                        "foreignField": "_id",
                        "as": "listaVehiculos"
                    }
                },
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(id)
                    }
                }])
            for (let r of result) {
                for (let v of r.listaVehiculos) {
                    v.choferData = await usersRepository.getById(v.chofer.toString())
                }
            }
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
                        "localField": "listaVehiculos",
                        "foreignField": "_id",
                        "as": "listaVehiculos"
                    }

                },])
            for (let r of result) {
                for (let v of r.listaVehiculos) {
                    v.choferData = await usersRepository.getById(v.chofer.toString())

                }
            }
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
