require("../util/httpRequester");
require ("../constants/config")
let url = "http://23.98.131.148:8080/api/device";
let urlToken = "http://23.98.131.148:8080/api/auth/login";

global.agregarDispositivo = async (data) => {
    let datosJSON = `
    {
    "name": "${data}",
    "type": "elm327",
    "label": null,
    "additionalInfo": {
        "gateway": false,
        "description": ""
    }
}
`;
    let token = await obtenerTokenThings()
    console.log(token)
    console.log("token")


    return HttpRequester.makePOST(url, {
        headers: {"content-type": "application/json"},
        body: datosJSON
    })
};

function obtenerTokenThings(){
    let datos =`{"username":"${CONFIG.THINGSUSER}", "password":"${CONFIG.THINGSPASSWORD}}"`
    console.log(datos)
    HttpRequester.makePOST(urlToken,{body:datos}).then(ok=>{
        console.log(ok);
    })
}

