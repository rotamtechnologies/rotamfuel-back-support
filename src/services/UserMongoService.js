const {getByUsername, getAllUsername,deleteUsername,update,getById} = require("../repository/UserMongoDB")
const {KeyCloakCliente: KeyCloakClient} = require("../models/KeyCloakCliente");
module.exports = {

    obtenerUsuarioMongo : async  (data) =>{
        return await getByUsername(data)
    },
    obtenerUsuariosMongo : async  () =>{
        return await getAllUsername()
    },
    deleteUsuario : async  (id) =>{
        let userById = await getById(id)
        let keyCloakCliente = new KeyCloakClient()
        let deletedUserKC = await keyCloakCliente.deleteUserCustomRealm(userById.KCId)


        return await deleteUsername(id)
    },
    update : async (data,id) => {
        let userById = await getById(id)
        let keyCloakCliente = new KeyCloakClient()
        let dataKc = {
            firstName:data.nombre,
            lastName:data.apellido,
            email:data.correo
        }
        let updateUsrKc = await keyCloakCliente.updateUserCustomRealm(userById.KCId,dataKc)
        console.log("updateUsrKc");
        console.log(updateUsrKc);
        return await update(data,id)
    }
}