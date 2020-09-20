require("../util/httpRequester");
let url ="http://mockbin.org/request";

global.agregarDispositivo = (data)=>{
    return HttpRequester.makePOST(url,data)
};

