
let client = {};
let database = {};
let container = {};
try{

   /* client = new CosmosClient({endpoint: CONFIG.DB.ENDPOINT, key:CONFIG.DB.KEY });
    database = client.database(CONFIG.DB.DATABASE);
    container = database.container(CONFIG.DB.CONTAINER);*/

}catch (e) {
    console.log(`error al cargar ${__filename.slice(__dirname.length + 1)}`);

}

/*
const querySpec = {
    //query: "SELECT * from c"
    //query: "SELECT VALUE COUNT(1) FROM c"
    query: "SELECT * FROM c where c._ts > @Desde",
    //query: "SELECT VALUE COUNT(1) FROM c where c._ts > 1590826140",
    "parameters": [
        {"name": "@Desde", "value": 1590826140},
        {"name": "@Hasta", "value": "NY"},
    ]
};
*/

exports.results = async (desde,hasta) =>{

    let results = await get({desde,hasta})

    return results

}


/*exports.promedioVelocidad =(desde,hasta) =>{
    const querySpec = {
        //query: "SELECT * FROM c",
        //query: "SELECT VALUE COUNT(1) FROM c WHERE c._ts > @Desde AND c._ts < @Hasta",
        query: "SELECT * FROM c WHERE c._ts > @Desde AND c._ts < @Hasta",
        "parameters": [
            {"name": "@Desde", "value": desde},
            {"name": "@Hasta", "value": hasta},
        ]
    };
    return container.items
        .query(querySpec)
        .fetchAll()

}*/

