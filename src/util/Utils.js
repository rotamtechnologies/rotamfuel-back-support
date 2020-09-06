var Cookies = require('cookies')
const atob = require("atob");


global.idByToken = (tkn) => {
    let tknInfo = JSON.parse(atob(tkn.split(".")[1]));
    return tknInfo.sub;
};
global.tokenByReq =(req,res)=>{
    var cookies = new Cookies(req, res);
    let token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length, req.headers.authorization.length) : cookies.get("RTM_FL-tkn");
    return token
};
