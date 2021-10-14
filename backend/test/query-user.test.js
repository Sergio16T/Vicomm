const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schema.js');
const Query = require('../resolvers/Query/index');
const Mutation = require('../resolvers/Mutation/index');
const { expect } = require("chai");


const config = {
    typeDefs,
    resolvers: {
        Query,
        Mutation,
    },
    dataSources: () => ({
        accountAPI: {
            getAccountById: () => ({ fst_nm: "Appa", lst_nm: "Airbender"}),
            createNewAccount: () => ({}),
            getAccountWithEmail: () => ({}),
        },
    }),
    context: () => ({
        req: {
                user: {
                id: 1
            },
        },
    }),
};

describe('GET_USER', function() {
    it('should get user when context req.user.id is present', async () => {
        const server = new ApolloServer(config);
        var res = await server.executeOperation({ query: `query GET_USER_QUERY { user { fst_nm, lst_nm } }` });
        expect(res.data.user.fst_nm).to.equal("Appa");
    });
});

