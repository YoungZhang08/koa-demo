const signup = require('../services/signup');
const signupModel = require('../model/model_signup');

module.exports = {
    async signUp(ctx) {
        const formData = ctx.request.body;
        await signupModel.findUser(formData.name)
            .then(async (res) => {
                console.log(res);
                // if(res[0].length >= 1) {
                //     ctx.body = {
                //         success: false,
                //         msg: '用户已存在'
                //     }
                // } else if(formData.pass !== formData.repearpass || pass.trim() === '') {
                //     ctx.body = {
                //         success: false,
                //         msg: '两次输入密码不一致'
                //     }
                // } else {
                //     await signupModel.insertData([])
                // }
            })

    }
}