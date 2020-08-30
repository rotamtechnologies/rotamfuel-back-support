const request = require('request');

global.HttpRequester = {

    makePOST: (url, data) => {
        console.log("REALIZANDO POST")
        return new Promise((ok, nulo) => {
            ok("ok")
           /* request.post(url, data, (error, response, body) => {
                if (error != null)
                    nulo(error)
                else
                    ok(body)
            })*/
        })
    }
}
