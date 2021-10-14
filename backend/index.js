const server = require('./server');
const cookieParser = require('cookie-parser');
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
    credentials: true,
}

app.use(cors(corsOptions));

// express middleware to handle cookies
app.use(cookieParser());

server.applyMiddleware({ app, cors: false }); // Apollo has it's own cors implementation. To prevent Apollo from overriding custom cors settings provided on line 22 set cors to false.

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);


/*
Example middleware to check for JWT on each request
Moved this logic to Apollo Server's Context

app.use(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log('token', token)
    if (!token) {
        next();
    }
    if (token) {
        const { id } = jwt.verify(token, process.env.jwtsecret);
        const user = await getAccountById(id).catch(err => { throw err; });
        req.user = user;
        // console.log('user set', req.user)
        next();
    }
});
*/