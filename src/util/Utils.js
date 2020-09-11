var Cookies = require('cookies')
const atob = require("atob");
import { Parser } from 'json2csv';

global.downloadResource = (res, fileName, fields, data) => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
}

global.idByToken = (tkn) => {
    let tknInfo = JSON.parse(atob(tkn.split(".")[1]));
    return tknInfo.sub;
};
global.tokenByReq =(req,res)=>{
    var cookies = new Cookies(req, res);
    let token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length, req.headers.authorization.length) : cookies.get("RTM_FL-tkn");
    return token
};
