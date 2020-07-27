const server = require('./backend/server'); 
const cookieParser = require('cookie-parser'); 
const jwt = require('jsonwebtoken'); 
const db = require('./backend/db'); 
const SQL = require('sql-template-strings'); 
require('dotenv').config(); 

// express middleware to handle cookies 
server.express.use(cookieParser()); 

server.express.use(async (req, res, next) => {
    const { token } = req.cookies; 
    if(!token) next();
    if(token) {
        const { ACCT_KEY } = jwt.verify(token, process.env.jwtsecret); 
        let qString = SQL`
        SELECT 
            ACCT.ACCT_KEY,
            ACCT.EMAIL,
            ACCT.FST_NAME,
            ACCT.LST_NAME, 
            ACCT.ACCT_TYP_CD
        FROM 
            ACCT
        WHERE 
            ACCT_KEY = ${ACCT_KEY}
            AND ACT_IND = 1
        `; 
        const [user] = await db.query(qString).catch(err => { throw err }); 
        req.user = user; 
        console.log('user set', req.user)
        next(); 
    }
});
server.start({
    cors: {
        credentials: true, // so not just anyone can crud data 
        origin: process.env.FRONTEND_URL, 
    },
  },(details) => console.log(`GraphQL server is running on ${details.port}`));