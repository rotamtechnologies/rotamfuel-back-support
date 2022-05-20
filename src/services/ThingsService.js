require("../util/httpRequester");
require("../constants/config")
let url = CONFIG.THINGSURL + "/api/device";
let urlToken = CONFIG.THINGSURL + "/api/auth/login";
let urlDispositivo = CONFIG.THINGSURL + "/api/device/";
let urlBuscarIdDispositivo = CONFIG.THINGSURL + "/api/tenant/devices?deviceName=";

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
    token = JSON.parse(token).token
    let dispositivo;
    dispositivo = await HttpRequester.makePOST(url, {
        headers: {"content-type": "application/json", "X-Authorization": "Bearer " + token},
        body: datosJSON
    });

    if (JSON.parse(dispositivo).message === "Device with such name already exists!") {
        dispositivo = await HttpRequester.makeGET(urlBuscarIdDispositivo + data, {
            headers: {"content-type": "application/json", "X-Authorization": "Bearer " + token}
        })
    }
    let idDispositivo = JSON.parse(dispositivo).id.id
    console.log(idDispositivo)

    return HttpRequester.makeGET(urlDispositivo + idDispositivo + "/credentials", {
        headers: {"content-type": "application/json", "X-Authorization": "Bearer " + token}
    })


};

function obtenerTokenThings() {
    let datos = `{"username":"${CONFIG.THINGSUSER}", "password":"${CONFIG.THINGSPASSWORD}"}`
    console.log(datos)
    return HttpRequester.makePOST(urlToken, {body: datos})
}

function obtenerAccessToken(dispositivo) {
    // return HttpRequester.makeGET(urlDispositivo + dispositivo + "/credentials")
}

