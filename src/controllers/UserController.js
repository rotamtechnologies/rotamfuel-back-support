const router = require("express").Router()
const path = require("path")
router.get('/descargar/datos', function (req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));

});

global.UserController = router;
