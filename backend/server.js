const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema.js');
const Query = require('./resolvers/Query/index');
const Mutation = require('./resolvers/Mutation/index');
const accountAPI = require('./data-access/account');
const itemAPI = require('./data-access/item');
const multimediaAPI = require('./data-access/multimedia');
const coverphotoAPI = require('./data-access/coverphoto');
require('dotenv').config();

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
    dataSources: () => ({
        accountAPI,
        itemAPI,
        multimediaAPI,
        coverphotoAPI, // @ToDo update coverphoto table to use existing multimedia_xref table instead of multimedia column in coverphoto table
    }),
    context: async ({ req, res }) => {
        const { token } = req.cookies;

        if (token) {
            const { id } = jwt.verify(token, process.env.jwtsecret);

            return {
                ...req,
                ...res,
                userId: id,
            };
        }

        return {
            ...req,
            ...res,
        };
    },
});

module.exports = server;