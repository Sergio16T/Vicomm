const mysql = require('mysql'); 
const util = require('util'); 
require('dotenv').config(); 

const connection = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER_NM,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
}); 

// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection;