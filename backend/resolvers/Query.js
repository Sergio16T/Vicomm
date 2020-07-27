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
        console.log('request', context.request.user)
        if(!context.request.user) return null; 
        console.log('user check get', context.request.user.ACCT_KEY); 
        let qString = SQL`
        SELECT 
            *
        FROM 
            ACCT
        WHERE 
            ACCT_KEY = ${context.request.user.ACCT_KEY}
            AND ACT_IND = 1
        `; 
        const [user] = await context.db.query(qString).catch(err => {
            throw new Error('Error:', err.message); 
        }); 
        return user; 
    }
}

module.exports = Query; 