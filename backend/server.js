const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema.js');
const Query = require('./resolvers/Query/index');
const Mutation = require('./resolvers/Mutation/index');
const db = require('./db');
require('dotenv').config();

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
    context: (req, res) => ({
        ...req,
        ...res,
        db
    }),
});

module.exports = server;