const userModel = require('../lib/mysql.js');
const md5 = require('md5'); // 密码加密

exports.getSignup = async ctx => {
    await ctx.render('signup', {
        session: ctx.session,
    })
};

exports.postSignup = async ctx => {
    let {name, password, repeatpass} = ctx.request.body;
    console.log(typeof password);

    await userModel.findUserByName(name)
        .then(async (res) => {
            console.log(res);
            if(res.length) {
                ctx.body = {
                    code: 500,
                    message: '用户存在'
                };
            } else if(password !== repeatpass || password.trim() === '') {
                ctx.body = {
                    code: 500,
                    message: '两次输入的密码不一致！'
                };
            } else {
                let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
                await userModel.signupUser([name, md5(password), getName])
                    .then(res => {
                        console.log('注册成功', res);
                        ctx.body = {
                            code: 200,
                            message: '注册成功'
                        };
                    });
            }
        });
};