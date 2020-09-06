global.JSONResponse = class JSONResponse {
    static OK(res, msg = {"result": "OK"}) {
        res.status(200).json(msg)
    }

    static ERROR(res, msg = {"result": "ERROR"}) {
        res.status(500).json(msg)
    }

};
