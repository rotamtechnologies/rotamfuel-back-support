require('dotenv').config();

global.CONFIG = {
    PORTEXPRESSAPP:process.env.PORT || 3000 ,

    KEYNODE:process.env.KEYNODE,
    CERTNODE:process.env.CERTNODE,
    PASSPHNODE:process.env.PASSPHRASE,

    KCHOST:process.env.KCHOST || 'http://localhost:8081/auth',
    KCTOKENURL: this.KCHOST + process.env.KCTOKENURL || "http://localhost:8081/auth/realms/rotamrealm/protocol/openid-connect/token",
    KCBASEURL:process.env.KCBASEURL  || 'http://localhost:8081/auth',
    KCINTROSPECTURL:process.env.KCINTROSPECTURL || "http://localhost:8081/auth/realms/rotamrealm/protocol/openid-connect/token/introspect/",

    INTROSPECT_CREDENTIALS:process.env.KCINTROSPECTCREDENTIALS || "account:bb7e955e-7f75-4ac6-a659-9dc1a7512471e",

    KCUSERNAME:process.env.nodeKEYCLOAK_user || "admin",
    KCPASSWORD:process.env.nodeKEYCLOAK_password || "rootela",
    KCRALMNAME:process.env.KCREALMNAME || "rotamrealm",
    KCGRANTTYPE:process.env.nodeKEYCLOAK_grantType || "password",
    KCCLIENTID:process.env.nodeKEYCLOAK_clientId || "admin-cli",


    THINGSUSER:process.env.THINGSUSER,
    THINGSPASSWORD:process.env.THINGSPASSWORD,

    AZURECS:process.env.AZURECS,

    DB:{
        DATABASE:process.env.COSMOSDB_db,
        CONTAINER:process.env.COSMOSDB_container,
        ENDPOINT:process.env.COSMOSDB_endpoint,
        KEY:process.env.COSMOSDB_key
    }
}

