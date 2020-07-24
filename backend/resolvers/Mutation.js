const SQL = require('sql-template-strings'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const mutation = { 
    async signUp(parent, args, context, info) {
        const email = args.email.toLowerCase(); 
        const password = await bcrypt.hash(args.password, 10); 
        // need to add check to see if email already exists in DB to prevent duplicate emails
        let qString = SQL`
        INSERT INTO 
            ACCT
        (
            FST_NAME, 
            LST_NAME, 
            EMAIL, 
            PASSWORD_NM,
            ACCT_TYP_CD,
            CRTE_TM, 
            CRTE_BY_ACCT_KEY,
            ACT_IND
        ) 
        VALUES (
            ${args.firstName},
            ${args.lastName},
            ${email},
            ${password},
            ${args.accountType},
            NOW(), 
            ${1},
            ${1}
        )
        `; 
        const result = await context.db.query(qString).catch(err => { 
            throw new Error({"Error Message": err.message}); 
        }); 
        let userQuery = `
        SELECT 
            *
        FROM 
            ACCT 
        WHERE 
            ACCT_KEY = ${result.insertId}
        `; 
        const [user] = await context.db.query(userQuery).catch(err => {
            throw new Error({"Error Message": err.message }); 
        }); 
        const token = jwt.sign({ ACCT_KEY: user.ACCT_KEY}, process.env.jwtsecret); 
        context.response.cookie("fs_token", token, {
            httpOnly: true, 
            maxAge:  1000 * 60 * 60 * 24 * 365 
        })
        console.log('user', user); 
        return user; 
    },
    async signIn(parent,args, context, info) {
        const email = args.email.toLowerCase(); 
        let [user]= SQL`
        SELECT 
            * 
        FROM 
            ACCT
        WHERE 
            EMAIL = ${email}
        `; 
        if(!user) {
            throw new Error(`No user found for email: ${email}`); 
        }
        const validPassword = bcrypt.compare(args.password, user.PASSWORD_NM);
        if(!validPassword){
            throw new Error('Invalid password')
        } 
        const token  = jwt.sign({ ACCT_KEY: user.ACCT_KEY}, process.env.jwtsecret); 
        context.response.cookie("fs_token", token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 365
        }); 
        return user; 
    }
}

module.exports = mutation; 