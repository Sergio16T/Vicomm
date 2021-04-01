const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER_NM,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});


const connection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            console.log("MySQL pool connected: threadId " + connection.threadId);

            const query = (sql, binding) => new Promise((resolve, reject) => {
                connection.query(sql, binding, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });

            const release = () => new Promise((resolve, reject) => {
                if (err) {
                    reject(err);
                }
                console.log("MySQL pool released: threadId " + connection.threadId);
                resolve(connection.release());
            });

            resolve({ query, release });
        });
    });
};

const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, binding, (err, result, fields) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

pool.on('connection', function (connection) {
    console.log('New Connection', connection.threadId);
});

module.exports = { connection, query }