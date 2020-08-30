const request = require('request');

global.HttpRequester = {

    makePOST: (url, data) => {
        return new Promise((ok, nulo) => {
            request.post(url, data, (error, response, body) => {
                if (error != null)
                    nulo(error)
                else
                    ok(body)
            })
        })
    }
}
