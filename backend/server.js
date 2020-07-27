const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query'); 
const Mutation = require('./resolvers/Mutation'); 
const db = require('./db'); 
require('dotenv').config(); 

const server = new GraphQLServer({
    typeDefs: 'backend/schema.graphql',
    resolvers: {
        Query: Query, 
        Mutation: Mutation
    }, 
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: (req, res) => ({
        ...req, 
        ...res, 
        db
    }), 
}); 

module.exports = server; 