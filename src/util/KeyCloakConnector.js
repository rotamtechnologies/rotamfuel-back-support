const request = require('request');

let username = CONFIG.KCUSERNAME;
let password = CONFIG.KCPASSWORD;
let kcClientId = CONFIG.KCCLIENTID;

module.exports = {
    getToken: () => {
        return new Promise((ok, nok) => {
            request.post(CONFIG.KCHOST+"/auth/realms/master/protocol/openid-connect/token", {
                form: {
                    username,
                    password,
                    grant_type: "password",
                    client_id: kcClientId
                },
            }, function (err, httpResponse, body) {
                if (err)
                    nok(err)
                ok(body)
            })
        })
    },
    changeRole: (userId, role) => {
        return new Promise(async (ok, nok) => {
            let tkAdm = await module.exports.getToken()
            tkAdm = JSON.parse(tkAdm)
            request.post({
                url: `${CONFIG.KCHOST}/auth/admin/realms/porsche/users/${userId}/role-mappings/realm`,
                json: [{id: role.id, name: role.name}],
                headers: {
                    "Authorization": "Bearer " + tkAdm.access_token
                }
            }, function (err, httpResponse, body) {
                console.log(err);
                console.log(body);
                if (err)
                    nok(err)

                ok(body)
            })
        })
    }
}