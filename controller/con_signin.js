const signinModel = require('../model/model_signin');

module.exports = {
    async signIn(ctx) {
        let userInfo = {
            name: ctx.request.body.name,
            pass: ctx.request.body.password
        };
        console.log(userInfo);
        await signinModel.signinUser(userInfo.name)
            .then(async (res) => {
                console.log(res);
                if(res.length === 0) {
                    console.log('无此用户!');
                    ctx.body = {
                        success: false,
                        status: 400,
                        msg: '无此用户'
                    }
                } else {
                    if(userInfo.name === res[0].name && userInfo.pass === res[0].pass){
                        console.log("登录成功!");
                        ctx.body = {
                            success: true,
                            status: 200,
                            msg: '登陆成功'
                        }
                    } else if(userInfo.name !== res[0].name || userInfo.pass !== res[0].pass) {
                        console.log('请检查用户名或密码是否正确!');
                        ctx.body = {
                            success: false,
                            status: 400,
                            msg: '请检查用户名或密码是否正确!'
                        }
                    }
                }
            })
    }
}