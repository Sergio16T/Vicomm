const { initializeTestServer } = require('./test-server');
const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accountAPI = require('../data-access/account');

const context = {
    req: {
        user: {
            id: 1,
        },
    },
    res: {
        cookie: sinon.spy(),
    },
};

describe(`USER QUERY'S & MUTATION'S`, function() {
    describe('GET_USER', function() {
        it('should get user when context userId is present', async () => {
            let server = initializeTestServer({
                dataSources: {
                    accountAPI,
                },
                context,
            });
            let stub = sinon.stub(accountAPI, 'getAccountById').resolves({ fst_nm: 'Appa', lst_nm: 'Airbender' });
            let { data: { user } } = await server.executeOperation({ query: `query GET_USER_QUERY { user { fst_nm, lst_nm } }` });

            expect(user.fst_nm).to.equal('Appa');
            expect(user.lst_nm).to.equal('Airbender');
            stub.restore();
        });

        it('should return null when context.userId is not defined', async function() {
            let server = initializeTestServer({
                dataSources: {},
                context: {},
            });
            let res = await server.executeOperation({ query: `query GET_USER_QUERY { user { fst_nm, lst_nm } }` });

            expect(res.data.user).to.equal(null);
        });

    });

    describe('SIGN_UP', function() {
        var hashStub;
        var jwtStub;

        beforeEach(function() {
            hashStub = sinon.stub(bcrypt, 'hash').returns('$gh$ILTWQLOm87!jdAsTZMm71AaMUX98');
            jwtStub = sinon.stub(jwt, 'sign').returns('ejyasdfkljkd!d99$$9adddcasdfdsfddskl;jweiuv2');
        });

        afterEach(function() {
            hashStub.restore();
            jwtStub.restore();
        });

        it('should throw error when email is unavailable', async function() {
            let server = initializeTestServer({
                dataSources: {
                    accountAPI,
                },
                context,
            });
            let stub = sinon.stub(accountAPI, 'getAccountWithEmail').resolves({
                id: '1',
                fst_nm: 'Samantha',
                lst_nm: 'Jones',
                email: 'samantha.jones@gmail.com',
                password: '$gh$ILTWQLOm87!jdAsTZMm71AaMUX98',
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
                },
            });

            expect(hashStub.calledOnce).to.be.true;
            expect(res.errors[0].message).to.equal('That email is taken!');
            stub.restore();
        });

        it('should successfully create new account', async function() {
            let getAccountWithEmailStub = sinon.stub(accountAPI, 'getAccountWithEmail').resolves(null);
            let createNewAccountStub = sinon.stub(accountAPI, 'createNewAccount').resolves(2);
            let getAccountByIdStub = sinon.stub(accountAPI, 'getAccountById').resolves({
                id: 2,
                fst_nm: 'Appa',
                lst_nm: 'Airbender',
                email: 'airbender@gmail.com',
                password: '$gh$ILTWQLOm87!jdAsTZMm71AaMUX98',
                crte_by_acct_key: 1,
                act_ind: 1,
            });

            let server = initializeTestServer({
                dataSources: {
                    accountAPI,
                },
                context,
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
                    email: 'airbender@gmail.com',
                    firstName: 'Appa',
                    lastName: 'Airbender',
                    password: 'testPassword',
                },
            });

            // Confirm Bcrypt hash is called
            expect(hashStub.calledOnce).to.be.true;

            // getAccountWithEmail
            expect(getAccountWithEmailStub.calledOnce).to.be.true;

            // createNewAccount is called with correct parameters
            expect(createNewAccountStub.calledOnce).to.be.true;
            expect(createNewAccountStub.getCall(0).args[0].firstName).to.equal('Appa');
            expect(createNewAccountStub.getCall(0).args[0].lastName).to.equal('Airbender');
            expect(createNewAccountStub.getCall(0).args[0].email).to.equal('airbender@gmail.com');
            expect(createNewAccountStub.getCall(0).args[0].password).to.equal('$gh$ILTWQLOm87!jdAsTZMm71AaMUX98');

            // Confirm getAccountByID is called
            expect(getAccountByIdStub.calledOnce).to.be.true;

            // Cookie works as expected
            expect(context.res.cookie.firstCall.args[0]).to.equal('token');
            expect(context.res.cookie.firstCall.args[1]).to.equal('ejyasdfkljkd!d99$$9adddcasdfdsfddskl;jweiuv2');
            expect(context.res.cookie.firstCall.args[2].httpOnly).to.be.true;
            expect(context.res.cookie.firstCall.args[2].maxAge).to.equal(31536000000);

            // Validate Response Shape
            expect(res.data.signUp.id).to.equal('2');
            expect(res.data.signUp.fst_nm).to.equal('Appa');
            expect(res.data.signUp.email).to.equal('airbender@gmail.com');
        });

    });
});
