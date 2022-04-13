const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const {
    startTransaction,
    commitChanges,
    rollBack,
} = require('../../data-access/utilities');
const { INTERNAL_SERVER_ERROR } = require('../../lib/ApolloError');
const logger = require('../../lib/logger');


module.exports = {
    async signUp(parent, args, context, info) {
        const {
            dataSources: {
                accountAPI: {
                    createNewAccount,
                    getAccountWithEmail,
                    getAccountById,
                },
            },
            res,
        } = context;

        const email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10);

        const account = await getAccountWithEmail(email);
        const emailUnavailable = account ? true : false;

        if (emailUnavailable) {
            logger.error(`SIGN_UP: Requested Email ${email} is Unavailable`);
            throw new INTERNAL_SERVER_ERROR('That email is taken!');
        }

        const newAccountParams = {
            firstName: args.firstName,
            lastName: args.lastName,
            email,
            password,
            crte_by_acct_key: 1,
            act_ind: 1,
        };
        let connection;

        try {
            // Get MYSQL connection and start transaction
            connection = await startTransaction();

            const { insertId } = await createNewAccount(newAccountParams, connection);

            const user = await getAccountById(insertId, connection);

            // commit DB changes
            await commitChanges(connection);

            const token = jwt.sign({ id: user.id }, process.env.jwtsecret);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge:  1000 * 60 * 60 * 24 * 365, // 1 Year
                sameSite: 'Strict',
                secure: process.env.NODE_ENV === 'production' ? true : false, //  Marks the cookie to be used with HTTPS only.
            });

            return user;
        } catch (err) {
            await rollBack(connection);
            logger.error(`SIGN_UP: ${err.message}`);
            throw new INTERNAL_SERVER_ERROR(err.message);
        } finally {
            connection.release();
        }
    },
    async signIn(parent, args, context, info) {
        const {
            dataSources: {
                accountAPI: {
                    getAccountWithEmail,
                },
            },
            res,
        } = context;

        const email = args.email.toLowerCase();
        const user = await getAccountWithEmail(email);
        if (!user) {
            logger.error(`SIGN_IN: No user found for email: ${email}`);
            throw new INTERNAL_SERVER_ERROR(`No user found for email: ${email}`);
        }

        const validPassword = await bcrypt.compare(args.password, user.password_nm);
        if (!validPassword) {
            logger.error(`SIGN_IN: Invalid password for account ID ${user.id}`);
            throw new INTERNAL_SERVER_ERROR('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, process.env.jwtsecret);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 Year
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production' ? true : false, //  Marks the cookie to be used with HTTPS only.
        });

        return user;
    },
    // @TODO update googleSignIn to use Transactions and Logger.js
    async googleSignIn(parent, args, context, info) {
        const {
            dataSources: {
                accountAPI: {
                    createNewAccount,
                    getAccountWithEmail,
                },
            },
            res,
        } = context;
        const { tokenId } = args;

        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
        });

        let {
            given_name,
            family_name,
            email,
        } = ticket.getPayload();

        email = email.toLowerCase();

        // check if account with email exists
        let user = await getAccountWithEmail(email);

        if (!user) {
            // create new account
            const newAccountParams = {
                firstName: given_name,
                lastName: family_name,
                email,
                password: null,
                crte_by_acct_key: 1,
                act_ind: 1,
            };

            await createNewAccount(newAccountParams);

            user = await getAccountWithEmail(email);
        }

        const token  = jwt.sign({ id: user.id }, process.env.jwtsecret);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        return user;
    },
    signOut(parent, args, context, info) {
        logger.debug('signout');
        context.res.clearCookie("token");
        return { message: "GoodBye!" }
    },
};