var Cookies = require('cookies')
const atob = require("atob");
const json2csv = require('json2csv');

global.downloadResource = (res, fileName, fields, data) => {
    const json2csvP = new json2csv.Parser({fields});
    const csv = json2csvP.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
}

global.idByToken = (tkn) => {
    let tknInfo = JSON.parse(atob(tkn.split(".")[1]));
    return tknInfo.sub;
};
global.tokenByReq = (req, res) => {
    var cookies = new Cookies(req, res);
    let token = req.headers.authorization ? req.headers.authorization.substring("Bearer ".length, req.headers.authorization.length) : cookies.get("RTM_FL-tkn");
    return token
};


global.addRel = (ent) => {
    let obj = {
        "$lookup": {
            "from": ent + "s",
            "localField": ent,
            "foreignField": "_id",
            "as": ent
        },
    }
    let unw = {$unwind: '$' + ent}
    return [obj,unw]

};


