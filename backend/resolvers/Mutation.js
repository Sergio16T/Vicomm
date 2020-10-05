const SQL = require('sql-template-strings'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const mutation = { 
    async signUp(parent, args, context, info) {
        const email = args.email.toLowerCase(); 
        const password = await bcrypt.hash(args.password, 10); 
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
            throw new Error(err.message); 
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
            throw new Error(err.message); 
        }); 
        const token = jwt.sign({ ACCT_KEY: user.ACCT_KEY}, process.env.jwtsecret); 
        context.res.cookie("token", token, {
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
        // console.log('user:', user)
        if(!user) {
            throw new Error(`No user found for email: ${email}`); 
        }
        const validPassword = await bcrypt.compare(args.password, user.PASSWORD_NM);
        if(!validPassword){
            throw new Error('Invalid password')
        } 
        const token  = jwt.sign({ ACCT_KEY: user.ACCT_KEY}, process.env.jwtsecret); 
        // console.log('token', token)
        context.res.cookie("token", token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 365
        }); 
        console.log('logging in');
        return user; 
    }, 
    async googleSignIn(parent, args, context, info) {
        const email = args.email.toLowerCase(); 
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
        context.res.cookie("token", token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 365
        }); 
        console.log('googleLogIn'); 
        return user; 
    }, 
    signOut(parent, args, context, info) {
        console.log('signout'); 
        context.res.clearCookie("token"); 
        return { message: "GoodBye!"}
    }, 
    async uploadImageToGallery(parent, args, context, info) {
        
        let imageQString = SQL`
        INSERT INTO 
            MLTMD 
        SET 
            MLTMD_URL=${args.image},
            MLTMD_LG_URL=${args.largeImage},
            CRTE_TM = NOW(), 
            CRTE_BY_ACCT_KEY = ${context.req.user.ACCT_KEY},
            ACT_IND = ${1}`; 

        const result = await context.db.query(imageQString).catch(err => { throw err; });
        let getNewMltmdQ = SQL`
        SELECT 
            * 
        FROM 
            MLTMD 
        WHERE 
            MLTMD_KEY = ${result.insertId};
        `; 
        const [MLTMD] = await context.db.query(getNewMltmdQ).catch(err => { throw err; }); 
        return MLTMD;
    },
    async deleteImages(parent, args, context, info) {
        for(let i =0; i < args.keys.length; i++) {
            let key = parseInt(args.keys[i]); 
            let deleteImgQ = SQL`
                DELETE FROM 
                    MLTMD
                WHERE 
                    MLTMD_KEY = ${key}
            `; 
            await context.db.query(deleteImgQ).catch(err => { throw err }); 
        }
        return { message: "Success! Image has been deleted" }; 
    },
    async updateCoverPhoto(parent, args, context, info) {
        const checkForCoverPhotoQ = SQL`
        SELECT 
            COVER_PHOTO_KEY
        FROM 
            COVER_PHOTO
        WHERE 
            ACCT_KEY = ${context.req.user.ACCT_KEY}
            AND ACT_IND = ${1}; 
        `;
        const [photo] =  await context.db.query(checkForCoverPhotoQ).catch(err => { throw err; }); 

        if(photo) {
            const updateCoverPhotoQ = SQL`
            UPDATE 
                COVER_PHOTO
            SET 
                MLTMD_KEY = ${args.key},
                LST_UPDT_TM = NOW(), 
                LST_UPDT_BY_ACCT_KEY=${context.req.user.ACCT_KEY}
            WHERE 
                ACCT_KEY = ${context.req.user.ACCT_KEY};
            `; 
            await context.db.query(updateCoverPhotoQ).catch(err => { throw err; }); 
            return { COVER_PHOTO_KEY: photo.COVER_PHOTO_KEY }; 

        } else {
            const createCoverPhotoQ = SQL `
            INSERT INTO 
                COVER_PHOTO
            SET 
                ACCT_KEY = ${context.req.user.ACCT_KEY},
                MLTMD_KEY = ${args.key},
                CRTE_TM = NOW(), 
                CRTE_BY_ACCT_KEY = ${context.req.user.ACCT_KEY},
                ACT_IND = ${1};
            `; 
            const result = await context.db.query(createCoverPhotoQ).catch(err => { throw err; }); 
            return { COVER_PHOTO_KEY: result.insertId }; 
        }
    },
    async removeCoverPhoto(parent, args, context, info) {
        const removeCoverPhotoQ = SQL`
        DELETE FROM 
            COVER_PHOTO
        WHERE 
            ACCT_KEY = ${context.req.user.ACCT_KEY}
            AND ACT_IND = ${1};
        `;    
        await context.db.query(removeCoverPhotoQ).catch(err => { throw err; }); 
        return { message: "Successfully Deleted Cover Photo" };
    }
}

module.exports = mutation; 