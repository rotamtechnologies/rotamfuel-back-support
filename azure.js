//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const k = require('keycloak-admin');
const fs = require('fs');
const kcAdminClient = new k.default({
    baseUrl: process.env.KCBASEURL,
    realmName: process.env.KCREALMNAME,
    requestConfig: {}
});
let app = require('express')();
const port = process.env.PORT
let laKey = fs.readFileSync(`${process.env.KEYNODE}`, 'utf8')
let laPassPhrase = `${process.env.PASSPHRASE}`
let laCert = fs.readFileSync(`${process.env.CERTNODE}`, 'utf8')
let server = require('https').createServer({
    key: laKey,
    cert: laCert,
    passphrase: laPassPhrase,
}, app);
kcAdminClient.auth({
    username: process.env.nodeKEYCLOAK_user,
    password: process.env.nodeKEYCLOAK_password,
    grantType: process.env.nodeKEYCLOAK_grantType,
    clientId: process.env.nodeKEYCLOAK_clientId,
}).then(dd => {
    console.log(dd)
    kcAdminClient.users.find().then(d => {
        console.log(d)
    })

});

server.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});
