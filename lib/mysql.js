const mysql = require('mysql');
const config = require('../config/default.js');

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT,
});

let query = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err);
            } else {
                connection.query(sql, val, (err, rows) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

let users = 
    `create table if not exists users(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        pass VARCHAR(100) NOT NULL,
        PRIMARY KEY(id)
    );`

let createTable = (sql) => {
    return query(sql, []);
};

// 建表
createTable(users);

// 注册用户
let signupUser = (val) => {
    let _sql = "insert into users set name=?,pass=?;";
    return query(_sql, val);
};

// 删除用户
let deleteUser = (name) => {
    let _sql = `delete from users where name="${name}"`;
    return query(_sql);
};

// 查找用户
let findUser = (name) => {
    let _sql = `select * from users where name="${name}";`;
    return query(_sql);
};

// 通过名字查找用户
let findUserByName = (name) => {
    let _sql = `select * from users where name="${name}";`;
    return query(_sql);
};

module.exports = {
    query,
    createTable,
    signupUser,
    deleteUser,
    findUser,
    findUserByName,
};

