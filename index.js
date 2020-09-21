const server = require('./backend/server'); 
const cookieParser = require('cookie-parser'); 
const jwt = require('jsonwebtoken'); 
const db = require('./backend/db'); 
const SQL = require('sql-template-strings'); 
const express = require('express');
const app = express();
const cors = require('cors'); 
require('dotenv').config(); 


// express middleware to sets appropriate response headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
const corsOptions = {
    origin: process.env.FRONTEND_URL, //change with your own client URL
    credentials: true
  }
app.use(cors(corsOptions)); 
// express middleware to handle cookies 
app.use(cookieParser()); 

app.use(async (req, res, next) => {
    const { token } = req.cookies; 
    // console.log('token', token)
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
        // console.log('user set', req.user)
        next(); 
    }
});

server.applyMiddleware({ app, cors: false }); 

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);