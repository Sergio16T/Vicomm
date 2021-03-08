const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    getAccountById,
    getAccountWithEmail,
    createNewAccount,
} = require('../../data-access/account');

module.exports = {
    async signUp(parent, args, context, info) {
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
        context.res.cookie("token", token, {
            httpOnly: true,
            maxAge:  1000 * 60 * 60 * 24 * 365,
        });
        return user;
    },
    async signIn(parent, args, context, info) {
        const email = args.email.toLowerCase();

        const user = await getAccountWithEmail(email);

        if (!user) {
            throw new Error(`No user found for email: ${email}`);
        }
        const validPassword = await bcrypt.compare(args.password, user.password_nm);
        if (!validPassword) {
            throw new Error('Invalid password');
        }
        const token  = jwt.sign({ id: user.id }, process.env.jwtsecret);
        // console.log('token', token)
        context.res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        console.log('logging in');
        return user;
    },
    async googleSignIn(parent, args, context, info) {
        const email = args.email.toLowerCase();

        let user = await getAccountWithEmail(email);
        // check if user already present with that email..
        // with this authToken is it best practice to use this to grab USER? in that case I need to update the record to have google_auth_tkn
        if (!user) {
            // create new account
            const newAccountParams = {
                firstName: args.firstName,
                lastName: args.lastName,
                email,
                password: null,
                crte_by_acct_key: 1,
                act_ind: 1,
            };

            await createNewAccount(newAccountParams);

            user = await getAccountWithEmail(email);
        }
        const token  = jwt.sign({ id: user.id }, process.env.jwtsecret);
        context.res.cookie("token", token, {
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