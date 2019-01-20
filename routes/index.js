const router = require('koa-router')();
const api = require('./api.js');

router.use('/signup', api.routes(), api.allowedMethods());

module.exports = router;