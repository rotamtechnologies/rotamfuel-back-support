const KeycloakAdminClient = require('keycloak-admin').default;
require("../util/httpRequester");
require("../util/Utils");
const btoa = require('btoa');

class KeyCloakCliente {
    constructor() {
        this.username = CONFIG.KCUSERNAME;
        this.introspectCredentials = CONFIG.INTROSPECT_CREDENTIALS;
        this.password = CONFIG.KCPASSWORD;
        this.grantType = CONFIG.KCGRANTTYPE;
        this.kcClientId = CONFIG.KCCLIENTID;
        this.kAuthClient = new KeycloakAdminClient({
            baseUrl: CONFIG.KCHOST,
            realmName: 'master',
            requestConfig: {}
        });

    }


    /*
    * introspectToken(token: string)
    * obtiene un token y lo valida
    * @param token: string
    *
    * @return response: string
    * */
    introspectToken(token) {
        let url = CONFIG.KCHOST + "/realms/rotamrealm/protocol/openid-connect/token/introspect/";
        let data = {
            form: {
                token_type_hint: "access_token",
                token: token
            }, headers: {
                Authorization: "Basic " + btoa(this.introspectCredentials)
            }
        };
        return HttpRequester.makePOST(url, data)
    }

    async iniciar() {
        await this.kAuthClient.auth({
            username: this.username,
            password: this.password,
            grantType: this.grantType,
            clientId: this.kcClientId,
        })
    }

    iniciar2() {
        return this.kAuthClient.auth({
            username: this.username,
            password: this.password,
            grantType: this.grantType,
            clientId: this.kcClientId,
        })
    }


    obtenerToken(username, pass) {
        let url = CONFIG.KCHOST + "/realms/rotamrealm/protocol/openid-connect/token";
        let data = {
            form: {
                username: username,
                password: pass,
                grant_type: this.grantType,
                client_id: this.kcClientId
            }
        };
        return HttpRequester.makePOST(url, data)
    }

    static obtenerToken2(username, pass) {
        let url = CONFIG.KCHOST + "/realms/rotamrealm/protocol/openid-connect/token";
        let data = {
            form: {
                username: username,
                password: pass,
                grant_type: "password",
                client_id: "admin-cli"
            }
        };
        return HttpRequester.makePOST(url, data)
    }

    refrescarToken(token) {
        let url = CONFIG.KCHOST + "/realms/rotamrealm/protocol/openid-connect/token";
        let data = {
            form: {
                refresh_token: token,
                grant_type: "refresh_token",
                client_id: this.kcClientId
            }
        };
        return HttpRequester.makePOST(url, data)
    }


    async crearUsuario(usuario, pass, email, firstName, lastName) {

        try {

            /*   await this.kAuthClient.auth({
                   username: this.username,
                   password: this.password,
                   grantType: this.grantType,
                   clientId: this.kcClientId,
               })
   */

            await this.iniciar();

            let okCreate = await this.kAuthClient.users.create({
                username: usuario,
                enabled: true,
                firstName,
                lastName,
                realm: "rotamrealm",
                email: email,
                emailVerified: true,
                credentials: [{"type": "password", "value": pass, "temporary": false}]
            })

        } catch (e) {
            console.log(`error al procesar crear usuario:${e}`);
        }
    }

    async usuario(id) {
        try {
            await this.iniciar();
            let infoUser = await this.kAuthClient.users.findOne({id, realm: "rotamrealm"});
            return {...infoUser};

        } catch (e) {
            console.log("error en cliente: " + (e));
            return e
        }
    }

    async updateUser(id, user) {
        let updateUser = null;
        try {

            await this.iniciar();

            updateUser = await this.kAuthClient.users.update(
                {id, realm: "rotamrealm"},
                {
                    ...user
                    /* firstName: 'william',
                     lastName: 'chang',
                     requiredActions: [RequiredActionAlias.UPDATE_PASSWORD],
                     emailVerified: true,*/
                },
            );
            console.log(updateUser);

        } catch (e) {
            console.log(e);
        }
        return updateUser
    }

    async createCar(id, car) {
        let autos = await this.usuario(id);
        autos = autos.attributes;
        let l;
        if (autos) {
            l = Object.keys(autos).length;
        } else {
            autos = {};
            l = 0
        }
        let newCar = {
            "regName": "auto" + l + Math.floor(Math.random() * (9999 - 1000)) + 1000,
            "VIN": "none",
            "marca": "",
            "modelo": "",
            "tipoCombustible": ""
        };


        autos["auto" + l] = Object.values(newCar);

        let data = {
            attributes: autos
        };

        this.updateUser(id, {
            ...data
        });
        console.log(Object.keys(autos).filter(auto=>auto.includes("auto")).map(o=>{ return {[o]:autos[o]}} ));

        return autos
    }


}

//let keyCloakClient = new KeyCloakCliente(CONFIG.KCUSERNAME, CONFIG.KCPASSWORD, CONFIG.INTROSPECT_CREDENTIALS);

exports.KeyCloakCliente = KeyCloakCliente;
