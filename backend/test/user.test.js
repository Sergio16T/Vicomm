const { initializeTestServer } = require('./test-server');
const { expect } = require('chai');

const context = {
    req: {
        user: {
            id: 1
        },
    },
};

describe(`USER QUERY'S & MUTATION'S`, function() {
    describe('GET_USER', function() {
        it('should get user when context req.user.id is present', async () => {
            let server = initializeTestServer({
                dataSources: {
                    accountAPI: {
                        getAccountById: () => ({ fst_nm: 'Appa', lst_nm: 'Airbender'}),
                    }
                },
                context
            });
            let { data: { user } } = await server.executeOperation({ query: `query GET_USER_QUERY { user { fst_nm, lst_nm } }` });

            expect(user.fst_nm).to.equal('Appa');
            expect(user.lst_nm).to.equal('Airbender');
        });

        it('should return null when context.req.user is not defined', async function() {
            let server = initializeTestServer({
                dataSources: {},
                context: {}
            });
            let res = await server.executeOperation({ query: `query GET_USER_QUERY { user { fst_nm, lst_nm } }` });

            expect(res.data.user).to.equal(null);
        });

    });

    describe('SIGN_UP', function() {
        it('should throw error when email is unavailable', async function() {
            const server = initializeTestServer({
                dataSources: {
                    accountAPI: {
                        getAccountById: () => null,
                        getAccountWithEmail: () => new Promise((resolve) => {
                            resolve({
                                id: '1',
                                fst_nm: 'Samantha',
                                lst_nm: 'Jones',
                                email: 'samantha.jones@gmail.com',
                                password: 'jk;asldfkjd',
                            });
                        }),
                    }
                },
                context
            });

            let res = await server.executeOperation({
                query: `
                    mutation SIGN_UP_MUTATION ($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
                            signUp(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
                                id,
                                fst_nm,
                                email
                            }
                        }
                    `,
                variables: {
                    email: 'samantha.jones@gmail.com',
                    firstName: 'Appa',
                    lastName: 'Airbender',
                    password: 'testPassword',
                }
            });
            expect(res.errors[0].message).to.equal('That email is taken!');
        });
    });
});