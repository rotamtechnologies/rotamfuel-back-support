require('dotenv').config();

global.CONFIG = {
    PORTEXPRESSAPP: process.env.PORT || 45555,

    KEYNODE: process.env.KEYNODE,
    CERTNODE: process.env.CERTNODE,
    PASSPHNODE: process.env.PASSPHRASE,

    KCHOST: process.env.KCHOST || "http://44.200.220.115:8082/auth",

    INTROSPECT_CREDENTIALS: process.env.KCINTROSPECTCREDENTIALS || 'account:90986e65-62a6-494c-92f4-5d45ddf53987',
    INTROSPECT_CREDENTIALSPORSCHE: process.env.KCINTROSPECTCREDENTIALSPORSCHE || 'loginapp:jcrwVEle4NRBS8crCPmx6wJaJaX1CGms',

    KCUSERNAME: process.env.nodeKEYCLOAK_user,
    KCPASSWORD: process.env.nodeKEYCLOAK_password,
    KCRALMNAME: process.env.KCREALMNAME || 'rotamrealm',
    KCGRANTTYPE: process.env.nodeKEYCLOAK_grantType || 'password' ,
    KCCLIENTID: process.env.nodeKEYCLOAK_clientId || 'admin-cli',
    KCPORSCHEID:process.env.KCPORSCHEID || 'jcrwVEle4NRBS8crCPmx6wJaJaX1CGms',
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

