const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schema.js');
const Query = require('../resolvers/Query/index');
const Mutation = require('../resolvers/Mutation/index');


const initializeTestServer = ({ dataSources, context }) => {
    let config = {
        typeDefs,
        resolvers: {
            Query,
            Mutation,
        },
        dataSources: () => (dataSources),
        context: () => (context),
    };

    return new ApolloServer(config);
}

module.exports.initializeTestServer = initializeTestServer;