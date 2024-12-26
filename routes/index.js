const express = require('express');

const router = express.Router();

require('./user.routes')(router);
// require('./auth.routes')(router);


module.exports.router = router;
