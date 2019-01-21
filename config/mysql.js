const mysql = require('mysql');
const config = require('./default');

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
                console.log(err);
                reject(err);
            } else {
                connection.query(sql, val, (err, res) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(res);
                        resolve(res);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = query;
