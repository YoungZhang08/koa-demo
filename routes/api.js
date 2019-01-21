// 注册
const router = require('koa-router')();
const signupController = require('../controller/con_signup.js');
const signinController = require('../controller/con_signin.js');

const routers = router
    .post('/signup', signupController.signUp)
    .post('/signin', signinController.signIn);

module.exports = routers;