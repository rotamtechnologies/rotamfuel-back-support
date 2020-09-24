global.CONFIG = {
    KCUSERNAME:process.env.nodeKEYCLOAK_user,
    KCPASSWORD:process.env.nodeKEYCLOAK_password,
    INTROSPECT_CREDENTIALS:process.env.KCINTROSPECTCREDENTIALS,
    KCBASEURL:process.env.KCBASEURL,
    KCRALMNAME:process.env.KCREALMNAME,
    PORTEXPRESSAPP:process.env.PORT,
    KEYNODE:process.env.KEYNODE,
    CERTNODE:process.env.CERTNODE,
    PASSPHNODE:process.env.PASSPHRASE,
    KCGRANTTYPE:process.env.nodeKEYCLOAK_grantType,
    KCCLIENTID:process.env.nodeKEYCLOAK_clientId,
    KCREALMURL:process.env.KCREALMURL,
    KCINTROSPECTURL:process.env.KCINTROSPECTURL,
    KCTOKENURL:process.env.KCTOKENURL,
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

