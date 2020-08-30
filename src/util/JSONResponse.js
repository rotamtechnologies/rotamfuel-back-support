global.JSONResponse = class JSONResponse{
    static OK(res,msg={"result":"OK"}){
        res.status(200).json(msg)
    }

};
