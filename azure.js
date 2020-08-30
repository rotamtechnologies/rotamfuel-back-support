process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const {EventHubConsumerClient} = require("@azure/event-hubs");
var k = require( 'keycloak-admin');
const connectionString = process.env.CONNECTIONSTRING
const eventHubName = process.env.HUBNAME;
const consumerGroup = process.env.CONSUMERGROUP;
const fs = require('fs');

const kcAdminClient = new k.default({
    baseUrl:'https://app.rotamfuel.com/auth',
    realmName:'rotamrealm',
    requestConfig:{
    }

});

let app = require('express')();

let laKey = fs.readFileSync(`${process.env.KEYNODE}`, 'utf8')
let laPassPhrase = `${process.env.PASSPHRASE}`
let laCert = fs.readFileSync(`${process.env.CERTNODE}`, 'utf8')

let server = require('https').createServer({
    key: laKey ,
    cert: laCert,
    passphrase: laPassPhrase,
}, app);
let io = require('socket.io')(server);
let elHttp = require('express')

var httpApp = elHttp();

httpApp.get('/', function (req, res) {
    io.emit('message', req.query.vel)

    res.send('Hello World!');
});


kcAdminClient.auth({
    username: process.env.nodeKEYCLOAK_user,
    password: process.  env.nodeKEYCLOAK_password,
    grantType: 'password',
    clientId: 'admin-cli',
}).then(dd=>{
    console.log(dd)
    kcAdminClient.users.find().then(d=>{
        console.log(d)
    })

});



var port = process.env.PORT || 3001;

server.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});

/*httpApp.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});*/
async function main() {

    const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

    // Subscribe to the events, and specify handlers for processing the events and errors.
    const subscription = consumerClient.subscribe({
            processEvents: async (events, context) => {
                for (const event of events) {
                    //console.log(".")
                    console.log(`Received event: '${JSON.stringify(event)}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
                    io.emit('message', event)
                }
                // Update the checkpoint.
                await context.updateCheckpoint(events[events.length - 1]);
            },

            processError: async (err, context) => {
                console.log(`Error : ${err}`);
            }
        }
    );

}

main().catch((err) => {
    console.log("Error occurred: ", err);
});

