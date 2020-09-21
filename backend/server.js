const { ApolloServer } = require('apollo-server-express'); 
const typeDefs = require('./schema.js'); 
const Query = require('./resolvers/Query'); 
const Mutation = require('./resolvers/Mutation'); 
const db = require('./db'); 
require('dotenv').config(); 

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query: Query, 
        Mutation: Mutation
    },
    context: (req, res) => ({
        ...req, 
        ...res, 
        db
    }), 
})

module.exports = server; 