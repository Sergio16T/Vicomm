const SQL = require('sql-template-strings'); 

const Query = {
    users: async (parent, args, context, info) => {
        let qString = `
            SELECT 
                *
            FROM 
                ACCT 
        `; 
        const result = await context.db.query(qString).catch(err => {
            throw new Error({"Error Message": err.message}); 
        }); 
        return result; 
    },
    user: async(parent, args, context, info) => {
        if(!context.user.ACCT_KEY) return null; 
        let qString = SQL`
        SELECT 
            *
        FROM 
            ACCT
        WHERE 
            ACCT_KEY = ${context.user.ACCT_KEY}
            AND ACT_IND = 1
        `; 
        const user = await db.query(qString).catch(err => {
            throw new Error('Error:', err.message); 
        }); 
        return user; 
    }
}

module.exports = Query; 