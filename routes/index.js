const router = require('koa-router')();
const api = require('./api.js');

router.use('/user', api.routes(), api.allowedMethods());    
module.exports = router;