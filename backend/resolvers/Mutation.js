const SQL = require('sql-template-strings'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const mutation = { 
    async signUp(parent, args, context, info) {
        const email = args.email.toLowerCase(); 
        const password = await bcrypt.hash(args.password, 10); 
        // need to add check to see if email already exists in DB to prevent duplicate emails
        let emailCheck = SQL`
        SELECT 
            * 
        FROM 
            ACCT
        WHERE 
            EMAIL = ${email}
        `; 
        const [emailUnavailable] = await context.db.query(emailCheck); 
        if(emailUnavailable) {
            throw new Error('That email is taken!'); 
        }
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
        context.response.cookie("token", token, {
            httpOnly: true, 
            maxAge:  1000 * 60 * 60 * 24 * 365 
        });
        return user; 
    },
    async signIn(parent,args, context, info) {
        const email = args.email.toLowerCase(); 
        let qString = SQL`
        SELECT 
            * 
        FROM 
            ACCT
        WHERE 
            EMAIL = ${email}
        `; 
        const [user] = await context.db.query(qString); 
        if(!user) {
            throw new Error(`No user found for email: ${email}`); 
        }
        const validPassword = bcrypt.compare(args.password, user.PASSWORD_NM);
        if(!validPassword){
            throw new Error('Invalid password')
        } 
        const token  = jwt.sign({ ACCT_KEY: user.ACCT_KEY}, process.env.jwtsecret); 
        context.response.cookie("token", token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 365
        }); 
        return user; 
    }, 
    async googleSignIn(parent, args, context, info) {
        const email = args.email.toLowerCase(); 
        console.log('email', email); 
        let qString = SQL`
        SELECT 
            * 
        FROM 
            ACCT
        WHERE 
            EMAIL = ${email}
        `; 
        let [user] = await context.db.query(qString); 
        // check if user already present with that email.. 
        // with this authToken is it best practice to use this to grab USER? in that case I need to update the record to have google_auth_tkn
        if(!user) {
           // create new account
           let createAccount = SQL `
                INSERT INTO 
                    ACCT
                (
                    FST_NAME, 
                    LST_NAME, 
                    EMAIL, 
                    GOOGLE_AUTH_TKN, 
                    CRTE_TM, 
                    CRTE_BY_ACCT_KEY,
                    ACT_IND
                ) 
                VALUES (
                    ${args.firstName},
                    ${args.lastName},
                    ${email},
                    ${args.accessToken},
                    NOW(), 
                    ${1},
                    ${1}
                )
           `;  
           await context.db.query(createAccount); 
           [user] = await context.db.query(qString); 
        }
        const token  = jwt.sign({ ACCT_KEY: user.ACCT_KEY}, process.env.jwtsecret); 
        context.response.cookie("token", token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 365
        }); 
        console.log('googleLogIn', user); 
        return user; 
    }, 
    signOut(parent, args, context, info) {
        console.log('signout'); 
        context.response.clearCookie("token"); 
        return { message: "GoodBye!"}
    }, 
}

module.exports = mutation; 