const k = require('keycloak-admin');
require("../util/httpRequester");
const btoa = require('btoa');
const kcAdminClient = new k.default({
    baseUrl: 'https://app.rotamfuel.com/auth',
    realmName: 'rotamrealm',
    requestConfig: {}
});

class KeyCloakCliente {
    constructor(username, password, introspectCredentials) {
        this.url = CONFIG.KCREALMURL;
        this.username = username;
        this.introspectCredentials = introspectCredentials;
        this.password = password;
        this.grantType = CONFIG.KCGRANTTYPE;
        this.kcClientId = CONFIG.KCCLIENTID;
        this.iniciar();
    }

    /*
    * introspectToken(token: string)
    * obtiene un token y lo valida
    * @param token: string
    *
    * @return response: string
    * */
    introspectToken(token) {
        let url = CONFIG.KCINTROSPECTURL;
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

    iniciar() {
        kcAdminClient.auth({
            username: this.username,
            password: this.password,
            grantType: this.grantType,
            clientId: this.kcClientId,
        }).then(d => console.log(d))
    }


    obtenerToken(username, pass) {
        let url = CONFIG.KCTOKENURL;
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


    async crearUsuario(usuario, pass, email, firstName, lastName) {
        await this.iniciar();
        return kcAdminClient.users.create({
            username: usuario,
            enabled: true,
            firstName,
            lastName,

            email: email,
            emailVerified: true,
            credentials: [{"type": "password", "value": pass, "temporary": false}]
        })
    }

    usuario(id) {
        return kcAdminClient.users.findOne({id})
    }


}

let keyCloakClient = new KeyCloakCliente(CONFIG.KCUSERNAME, CONFIG.KCPASSWORD, CONFIG.INTROSPECT_CREDENTIALS);

global.keyCloakClient = keyCloakClient
