const db = require('../db');
const SQL = require('sql-template-strings');

module.exports = {
    getAllAccounts: async () => {
        let query = `
            SELECT
                *
            FROM
                acct
        `;

        const result = await db.query(query).catch(err => {
            throw err;
        });

        return result;
    },
    getAccountWithEmail: async (email) => {
        let query = SQL`
        SELECT
            *
        FROM
            acct
        WHERE
            email = ${email}
            AND act_ind = ${1}
        `;

        const [account] = await db.query(query).catch(err => {
            throw err;
        });

        return account;
    },

    getAccountById: async (id) => {
        let query = SQL`
        SELECT
            *
        FROM
            acct
        WHERE
            id = ${id}
            AND act_ind = ${1}
        `;

        const [user] = await db.query(query).catch(err => {
            throw err;
        });

        return user;
    },

    createNewAccount: async (params) => {
        const {
            firstName,
            lastName,
            email,
            password,
            crte_by_acct_key,
            act_ind,
        } = params;

        let query = SQL`
        INSERT INTO
            acct
        (
            fst_nm,
            lst_nm,
            email,
            password_nm,
            crte_tm,
            crte_by_acct_key,
            act_ind
        )
        VALUES (
            ${firstName},
            ${lastName},
            ${email},
            ${password},
            NOW(),
            ${crte_by_acct_key},
            ${act_ind}
        )
        `;

        const result = await db.query(query).catch(err => {
            throw err;
        });

        return result;
    },
    // TO DO ~ createNewAccountWithGoogleAuth: can be deleted
    createNewAccountWithGoogleAuth: async (params) => {
        const {
            accessToken,
            email,
            firstName,
            lastName,
        } = params;

        let query = SQL`
            INSERT INTO
                acct
            (
                fst_nm,
                lst_nm,
                email,
                google_auth_tkn,
                crte_tm,
                crte_by_acct_key,
                act_ind
            )
            VALUES (
                ${firstName},
                ${lastName},
                ${email},
                ${accessToken},
                NOW(),
                ${1},
                ${1}
            )
        `;

        const result = await db.query(query).catch(err => {
            throw err;
        });

        return result;
    },
};