const mysql = require('../config/mysql.js');
const md5 = require('md5'); // 密码加密

// 注册用户
let signupUser = (val) => {
    let _sql = `INSERT INTO users(id,name,pass) VALUES(1,?,?)`;
    let res = mysql.query(_sql, [val.id, val.name, md5(val.pass)]);
    console.log(res);
    return res;
};

let findUser = (name) => {
    let _sql = `SELECT * FROM  user_info WHERE name="${name}"`;
    return mysql.query(_sql);
};

module.exports = {
    signupUser,
    findUser
};