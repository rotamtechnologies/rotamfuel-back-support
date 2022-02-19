require('dotenv').config();

global.CONFIG = {
    PORTEXPRESSAPP: process.env.PORT || 45555,

    KEYNODE: process.env.KEYNODE,
    CERTNODE: process.env.CERTNODE,
    PASSPHNODE: process.env.PASSPHRASE,

    KCHOST: process.env.KCHOST || "http://localhost:8082/auth",

    INTROSPECT_CREDENTIALS: process.env.KCINTROSPECTCREDENTIALS,

    KCUSERNAME: process.env.nodeKEYCLOAK_user,
    KCPASSWORD: process.env.nodeKEYCLOAK_password,
    KCRALMNAME: process.env.KCREALMNAME,
    KCGRANTTYPE: process.env.nodeKEYCLOAK_grantType,
    KCCLIENTID: process.env.nodeKEYCLOAK_clientId,


    THINGSUSER: process.env.THINGSUSER,
    THINGSPASSWORD: process.env.THINGSPASSWORD,
    THINGSURL: process.env.THINGSURL || "http://localhost:8080",


    ACTIVEMQHOST: process.env.ACTIVEMQHOST || "127.0.0.1",
    ACTIVEMQPORT: process.env.ACTIVEMQPORT || "61613",

    DB: {
        MONGOURL:process.env.MONGOURL || "localhost",
        MONGOUSERNAME:process.env.MONGOUSERNAME || "rotam",
        MONGOPASSWORD:process.env.MONGOPASSWORD || "R0t4m.FUEL.2020",
        MONGODB:process.env.MONGODB || "iot",

        DATABASE: process.env.COSMOSDB_db,
        CONTAINER: process.env.COSMOSDB_container,
        ENDPOINT: process.env.COSMOSDB_endpoint,
        KEY: process.env.COSMOSDB_key
    }
}

