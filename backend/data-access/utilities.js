const mysql = require('../db');

module.exports = {
    startTransaction: async () => {
        const connection = await mysql.connection();
        await connection.query("START TRANSACTION");
        return connection
    },
    commitChanges: async (connection) => {
        await connection.query("COMMIT");
    },
    rollBack: async (connection) => {
        await connection.query("ROLLBACK");
    },
}