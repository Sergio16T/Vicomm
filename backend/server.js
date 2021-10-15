const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema.js');
const Query = require('./resolvers/Query/index');
const Mutation = require('./resolvers/Mutation/index');
const accountAPI = require('./data-access/account');
require('dotenv').config();

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
    dataSources: () => ({
        accountAPI,
        // @ToDo add other API dataSources and update references
    }),
    context: async ({ req, res }) => {
        const { token } = req.cookies;
        const { getAccountById } = accountAPI;

        if (token) {
            const { id } = jwt.verify(token, process.env.jwtsecret);
            const user = await getAccountById(id).catch(err => { throw err; });
            req.user = user;
            return {
                ...req,
                // user: user, // @ToDo Update context to include user and update references to context.req.user.id
                ...res,
            };
        }

        return {
            ...req,
            ...res,
        };
    },
});

module.exports = server;