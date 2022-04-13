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

        const result = await db.query(query);

        return result;
    },
    getAccountWithEmail: async (email, connection) => {
        let query = SQL`
        SELECT
            *
        FROM
            acct
        WHERE
            email = ${email}
            AND act_ind = ${1}
        `;

        let mysql = connection ? connection : db;

        let [account] = await mysql.query(query);

        return account;
    },

    getAccountById: async (id, connection) => {
        let query = SQL`
        SELECT
            *
        FROM
            acct
        WHERE
            id = ${id}
            AND act_ind = ${1}
        `;

        let mysql = connection ? connection : db;

        let [user] = await mysql.query(query);

        return user;
    },

    createNewAccount: async (params, connection) => {
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

        let mysql = connection ? connection : db;

        let result = await mysql.query(query);
        return result;
    },
};