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
        // console.log('request user', context.req.user)
        if(!context.req.user) return null; 
        // console.log('user check get', context.req.user.ACCT_KEY); 
        let qString = SQL`
        SELECT 
            *
        FROM 
            ACCT
        WHERE 
            ACCT_KEY = ${context.req.user.ACCT_KEY}
            AND ACT_IND = 1
        `; 
        const [user] = await context.db.query(qString).catch(err => {
            throw new Error('Error:', err.message); 
        }); 
        return user; 
    },
    getImageGallery: async(parent, args, context, info) => {
        let qString = SQL`
            SELECT 
                * 
            FROM 
                mltmd 
            WHERE 
                CRTE_BY_ACCT_KEY = ${context.req.user.ACCT_KEY}
                AND ACT_IND = ${1}
        `; 
        const MLTMD = await context.db.query(qString).catch(err => { throw err; }); 
        // console.log(MLTMD)
        return MLTMD; 
    },
    getCoverPhoto: async(parent, args, context, info) => {
        const coverPhotoQ = SQL`
        SELECT 
            MLTMD.* 
        FROM 
            COVER_PHOTO, 
            MLTMD
        WHERE 
            COVER_PHOTO.ACCT_KEY = ${context.req.user.ACCT_KEY}
            AND MLTMD.MLTMD_KEY = COVER_PHOTO.MLTMD_KEY
            AND COVER_PHOTO.ACT_IND =${1}
        `; 
        const [multiMedia] = await context.db.query(coverPhotoQ).catch(err => { throw err; });  
        return multiMedia; 
    }
}

module.exports = Query; 