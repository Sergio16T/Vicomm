const server = require('./backend/server'); 
const { getAccountById } = require('./backend/services/account'); 
const cookieParser = require('cookie-parser'); 
const jwt = require('jsonwebtoken'); 
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
    origin: process.env.FRONTEND_URL, // client URL
    credentials: true
}
app.use(cors(corsOptions)); 

// express middleware to handle cookies 
app.use(cookieParser()); 

app.use(async (req, res, next) => {
    const { token } = req.cookies; 
    // console.log('token', token)
    if (!token) next();
    if (token) {
        const { id } = jwt.verify(token, process.env.jwtsecret); 
        const user = await getAccountById(id).catch(err => { throw err; }); 
        req.user = user; 
        // console.log('user set', req.user)
        next(); 
    }
});

server.applyMiddleware({ app, cors: false }); 

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);