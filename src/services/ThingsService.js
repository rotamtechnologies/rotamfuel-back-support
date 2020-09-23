require("../util/httpRequester");
require ("../constants/config")
let url = "http://23.98.131.148:8080/api/device";

global.agregarDispositivo = (data) => {
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

    return HttpRequester.makePOST(url, {
        headers: {"content-type": "application/json"},
        body: datosJSON
    })
};

function obtenerTokenThings(){
    let datos =`{"username":"${CONFIG.THINGSUSER}", "password":"${CONFIG.THINGSPASSWORD}"`
    return HttpRequester.makePOST(urlToken,{headers:{},body:datos})
}

