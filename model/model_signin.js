const mysql = require('../config/mysql.js');

// 通过用户名查找用户
let signinUser = async (name) => {
    let _sql = `SELECT * FROM  users WHERE name="${name}"`;
    let res = await mysql.query(_sql);
    return res;
};

module.exports = {
    signinUser
};