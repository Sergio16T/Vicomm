const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/*
@TODO
1. Error Handling w/ Apollo Error Class
2. Logging with winston
3. use MYSQL Begin Transaction Commit and Rollback
*/
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
            throw new Error('That email is taken!');
        }

        const newAccountParams = {
            firstName: args.firstName,
            lastName: args.lastName,
            email,
            password,
            crte_by_acct_key: 1,
            act_ind: 1,
        };

        const { insertId } = await createNewAccount(newAccountParams);

        const user = await getAccountById(insertId);

        const token = jwt.sign({ id: user.id }, process.env.jwtsecret);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge:  1000 * 60 * 60 * 24 * 365,
        });

        return user;
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
            throw new Error(`No user found for email: ${email}`);
        }

        const validPassword = await bcrypt.compare(args.password, user.password_nm);
        if (!validPassword) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id }, process.env.jwtsecret);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        console.log('logging in');
        return user;
    },
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
        console.log('googleLogIn');

        return user;
    },
    signOut(parent, args, context, info) {
        console.log('signout');
        context.res.clearCookie("token");
        return { message: "GoodBye!" }
    },
};