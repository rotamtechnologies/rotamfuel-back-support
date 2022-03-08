const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userScheme = new Schema({

    username: {type: String},
    KCname: {type: String},
    KCId: {type: String},
    apellido: {type: String},
    nombre: {type: String},
    correo: {type: String},
    deleted: {type:Boolean}


});

let userMongo = mongoose.model('user', userScheme)


module.exports = {
    getAllUsername: async () => {
        let result = []
        try {
            result = await userMongo.find()
        } catch (e) {
            console.log(e);
        }
        return result
    },
    getById: async id => {
        let result = []
        try {
            result = await userMongo.findOne({"_id":id})
        } catch (e) {
            console.log(e);
        }
        return result
    },
    getByUsername: async username => {
        console.log("obteniendo " + username)
        let result = []
        try {
            result = await userMongo.findOne({username:username})
        } catch (e) {
            console.log(e);
        }
        return result
    },
    saveUsername: async data => {
        console.log("guardando " + data)
        try {
            let result = await userMongo.create(data)
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    },
    update: async (data,id) => {
        console.log("guardando " + data)
        try {
            let result = await userMongo.updateOne({"_id":id},{$set:data})
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    },
    deleteUsername: async id => {
        console.log("guardando " + id)
        try {
            let result = await userMongo.deleteOne({"_id":id})
            console.log(result);
        } catch (e) {
            console.log(e);

        }
    }
}
