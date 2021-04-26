const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let iotMessageSchema = new Schema({

    token: {type: String},
    estado: {type: String},
    Date: {type: Date},
    Hour: {type: String},
    Latitude: {type: String},
    Longitude: {type: String},
    latitude: {type: String},
    longitude: {type: String},
    'Vehicle speed': {type: String},
    'MAF air flow rate': {type: String},
    'Engine RPM': {type: String},
    'Calculated engine load': {type: String},
    'Throttle position': {type: String},
    'Intake manifold absolute pressure': {type: String},
    DeltaTime: {type: String},
    CumulativeTime: {type: String},
    Event: {type: String},
    _ts: {type: String}
    /*
    { token: 'ICEHMzUI51Zdmu0uhkua',
      estado: 'online',
      Date: '2021-04-23',
      Hour: '21:39:14.235',
      Latitude: -33.4278928,
      Longitude: -70.6739196,
      latitude: -33.4278928,
      longitude: -70.6739196,
      'Vehicle speed': 127,
      'MAF air flow rate': 22.88,
      'Engine RPM': 6125.25,
      'Calculated engine load': 19.607843137254903,
      'Throttle position': 0,
      'Intake manifold absolute pressure': 0,
      DeltaTime: 0.754,
      CumulativeTime: 17.801,
      Event: 22 }*/


});

let IotMessage = mongoose.model('iotMessage', iotMessageSchema)


const connectDB = async () => {
    let client;
    try {
        client = await mongoose.connect(`mongodb://${CONFIG.DB.MONGOUSERNAME}:${CONFIG.DB.MONGOPASSWORD}@${CONFIG.DB.MONGOURL}:27017/${CONFIG.DB.MONGODB}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("MongoDB Conected")


    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    return client
}

connectDB().then(ok => {
})

global.save = async (data) => {
    console.log("guardando " + data)
    try {
        let result = await IotMessage.create(data)
        console.log(result);
    } catch (e) {
        console.log(e);

    }


};
global.get = async (data) => {
    console.log("obteniendo " + data)
    let result = []
    try {
        result = await IotMessage.find({estado:"online"})
        //console.log(result);
    } catch (e) {
        console.log(e);

    }
    return result


};
