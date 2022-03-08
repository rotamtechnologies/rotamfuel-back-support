const KeycloakAdminClient = require('keycloak-admin').default;
require("../util/httpRequester");
require("../util/Utils");
const btoa = require('btoa');
const kcConecctor = require("../util/KeyCloakConnector")
const userMongo = require("../repository/UserMongoDB");

class KeyCloakCliente {
    constructor() {
        this.username = CONFIG.KCUSERNAME;
        this.introspectCredentials = CONFIG.INTROSPECT_CREDENTIALS;
        this.introspectCredentialsPorsche = CONFIG.INTROSPECT_CREDENTIALSPORSCHE;
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
        //let url = CONFIG.KCHOST + "/realms/rotamrealm/protocol/openid-connect/token/introspect/";
        let url = CONFIG.KCHOST + "/realms/porsche/protocol/openid-connect/token/introspect/";
        let data = {
            form: {
                token_type_hint: "access_token",
                token: token,
            }, headers: {
                Authorization: "Basic " + btoa(this.introspectCredentialsPorsche)
            }
        };
        return HttpRequester.makePOST(url, data)
    }

    introspectTokenCustomRealm(token, realm) {
        let url = CONFIG.KCHOST + "/realms/" + realm + "/protocol/openid-connect/token/introspect/";
        let data = {
            form: {
                token_type_hint: "access_token",
                token: token
            }, headers: {
                Authorization: "Basic " + btoa(realm == "porsche" ? CONFIG.INTROSPECT_CREDENTIALSPORSCHE : realm)
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

    obtenerTokenCustomRealm(username, pass, realm) {
        let url = CONFIG.KCHOST + "/realms/" + realm + "/protocol/openid-connect/token";
        let data = {
            form: {
                username: username,
                password: pass,
                grant_type: this.grantType,
                client_id: "loginapp",
                client_secret: CONFIG.KCPORSCHEID
            }
        };
        console.log(data);
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

    async crearUsuarioCustomRealm(usuario, pass, email, firstName, lastName, realm, roleName) {

        try {
            await this.iniciar();
            let okCreate = await this.kAuthClient.users.create({
                username: usuario,
                enabled: true,
                firstName,
                lastName,
                realm,
                email,
                emailVerified: true,
                credentials: [{"type": "password", "value": pass, "temporary": false}],

            })
            const currentRole = await this.kAuthClient.roles.findOneByName({
                name: roleName,
                realm: realm
            });
            let tkAdmin = await kcConecctor.changeRole(okCreate.id, currentRole)
            let dataT = {}
            let datoskyclok = await this.kAuthClient.users.findOne({id: okCreate.id, realm})
            dataT.username = datoskyclok.username
            dataT.name = firstName
            dataT.sub = okCreate.id
            console.log(dataT);
            console.log(datoskyclok);
            console.log("datoskyclok");
            console.log(firstName);

            userMongo.getByUsername(dataT.username).then(okUserMongo => {
                console.log(okUserMongo);
                if (!okUserMongo) {
                    console.log("persistir");
                    let newUser = {
                        username: dataT.username,
                        KCname: dataT.name,
                        KCId: dataT.sub,
                        apellido: lastName,
                        nombre: firstName,
                        correo: email
                    }
                    userMongo.saveUsername(newUser)
                } else {
                    console.log("no persistir")
                }
            })

            /*let okRole = await this.kAuthClient.users.addRealmRoleMappings({
                id: okCreate.id,

                // at least id and name should appear
                roles: [
                    {
                        //id: currentRole.id,
                        name: currentRole.name,
                    },
                ],
            })
            console.log("okRole");
            console.log(okRole);*/
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

    static getKCAuthCL() {
        return this.kAuthClient
    }

    async updateUserCustomRealm(id, user, realm = "") {
        let updateUser = null;
        try {

            await this.iniciar();

            updateUser = await this.kAuthClient.users.update(
                {id, realm: "porsche"},
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

    async updateUser(id, user) {
        let updateUser = null;
        try {

            await this.iniciar();

            updateUser = await this.kAuthClient.users.update(
                {id, realm: "porsche"},
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

    async deleteUserCustomRealm(id) {
        let deletedUser = null;
        try {

            await this.iniciar();

            deletedUser = await this.kAuthClient.users.del({id, realm: "porsche"})
            console.log(deletedUser);

        } catch (e) {
            console.log(e);
        }
        return deletedUser
    }

    async createCar(id, car) {
        let autos = await this.usuario(id);
        autos = autos.attributes;
        console.log(autos);
        let l;
        if (autos) {
            l = Object.keys(autos).length;
        } else {
            autos = {};
            l = 0
        }
        let cod = () => {
            return Math.floor(Math.random() * 10).toString()
                + Math.floor(Math.random() * 10).toString()
                + Math.floor(Math.random() * 10).toString()
                + Math.floor(Math.random() * 10).toString()
                + Math.floor(Math.random() * 10).toString()
        };

        let newCar = {
            "regName": "auto" + cod(),
            "VIN": "none",
            "marca": "",
            "modelo": "",
            "tipoCombustible": ""
        };


        autos["auto" + cod()] = Object.values(newCar);

        let data = {
            attributes: autos
        };

        this.updateUser(id, {
            ...data
        });
        /*  console.log(Object.keys(autos).filter(auto => auto.includes("auto")).map(o => {
              return {[o]: autos[o]}
          }));*/


        return autos
    }


}

//let keyCloakClient = new KeyCloakCliente(CONFIG.KCUSERNAME, CONFIG.KCPASSWORD, CONFIG.INTROSPECT_CREDENTIALS);

exports.KeyCloakCliente = KeyCloakCliente;
