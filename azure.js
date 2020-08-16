
const { EventHubConsumerClient } = require("@azure/event-hubs");

const connectionString = process.env.CONNECTIONSTRING
const eventHubName = process.env.HUBNAME;
const consumerGroup = process.env.CONSUMERGROUP;

let app = require('express')();
let server = require('https').createServer({rejectUnauthorized:false},app);
let io = require('socket.io')(server);
const fs = require('fs');
let elHttp = require('express')

var httpApp = elHttp();




httpApp.get('/', function (req, res) {
    io.emit('message', req.query.vel)

    res.send('Hello World!');
});

httpApp.get('/a', function (req, res) {
    fs.readFile('data.csv', 'utf8', function (err, data) {
        var dataArray = data.split(/\r?\n/);
        let c = 0;

        if (c < dataArray.length) {
            leer(dataArray, c)
        }


        res.send("exit");

        /*  dataArray.forEach(da=>{
          })*/

    });
});

function leer(dataArray, c) {
    if (c < dataArray.length) {
        setTimeout(() => {
            io.emit('message', {
                uno: dataArray[c].split(",")[5],
                dos: dataArray[c].split(",")[0],
                tre: dataArray[c].split(",")[2]
            })
            console.log(dataArray[c]);
            c++;
            leer(dataArray, c);
        }, 1)
    }

}


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

    // After 30 seconds, stop processing.
   /* await new Promise((resolve) => {
        setTimeout(async () => {
            await subscription.close();
            await consumerClient.close();
            resolve();
        }, 30000);
    });*/
}

main().catch((err) => {
    console.log("Error occurred: ", err);
});
