const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userScheme = new Schema({

    username: {type: String},
    KCname: {type: String},
    KCId: {type: String}


});

let userMongo = mongoose.model('user', userScheme)


module.exports = {
    getByUsername: async username => {
        console.log("obteniendo " + username)
        let result = []
        try {
            result = await userMongo.find({username:username})
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
    }
}
