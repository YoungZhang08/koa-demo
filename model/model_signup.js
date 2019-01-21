const mysql = require('../config/mysql.js');

// 注册用户
let signupUser = async (val) => {
    let _sql = `INSERT INTO users(name,pass) VALUES(?,?)`;
    let res = await mysql.query(_sql, [val.name, val.pass]);
    return res;
};

module.exports = {
    signupUser
};