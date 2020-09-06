var Cookies = require('cookies')


global.idByToken = (tkn) => {
    console.log(atob(tkn.split(".")[1]));
    let idUser = JSON.parse(atob(tkn.split(".")[1])).sub;
    return idUser;
}
global.tokenByReq =(req,res)=>{
    var cookies = new Cookies(req, res);
    let token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length, req.headers.authorization.length) : cookies.get("RTM_FL-tkn");
    return token
}
