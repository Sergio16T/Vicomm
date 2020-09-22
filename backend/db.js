const mysql = require('mysql'); 
const util = require('util'); 
require('dotenv').config(); 

const connection = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER_NM,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
}); 

// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

// connection.connect(function(err){
//     if (err) {
//         console.log("error connecting: " + err.stack);
//         return;
//     };
//     console.log("connected as... " + connection.threadId);
// });

module.exports = connection;