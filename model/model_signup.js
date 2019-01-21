const mysql = require('../config/mysql.js');
const md5 = require('md5'); // 密码加密

// 注册用户
let signupUser = async (val) => {
    let _sql = `INSERT INTO users(id,name,pass) VALUES(1,?,?)`;
    let res = await mysql.query(_sql, [val.id, val.name, md5(val.pass)]);
    console.log(res);
    return res;
};

// 通过用户名查找用户
let signinUser = async (name) => {
    let _sql = `SELECT * FROM  user_info WHERE name="${name}"`;
    let res = await mysql.query(_sql);
    return res;
};

module.exports = {
    signupUser,
    signinUser
};