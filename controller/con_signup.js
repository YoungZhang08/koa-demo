const signupModel = require('../model/model_signup');
const signinModel = require('../model/model_signin');

module.exports = {
    async signUp(ctx) {
        let userInfo = {
            name: ctx.request.body.name,
            pass: ctx.request.body.password
        };
        console.log(userInfo);
        await signinModel.signinUser(userInfo.name)
            .then(async (res) => {
                if(res.length === 0) {
                    let result = await signupModel.signupUser(userInfo);
                    console.log(result);
                    ctx.body = {
                        success: true,
                        status: 200,
                        msg: '注册成功'
                    }
                } else {
                    console.log("用户已存在!");
                    ctx.body = {
                        success: false,
                        status: 500,
                        msg: '用户已存在'
                    }
                }
            })
    }
}