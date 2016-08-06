var express = require('express');
var router  = express.Router();

router.post('/:shoppingId', require('./services/purchase'));

module.exports = router;