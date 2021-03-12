const db = require('../db');
const SQL = require('sql-template-strings');

module.exports = {
    createItem: async (params) => {
        const {
            createByAccountKey,
            description,
            name,
            price,
            salePrice,
            weight,
            uniqueId,
        } = params;

        let query = SQL`
            INSERT INTO
                item
            SET
                item_title = ${name},
                item_uid = ${uniqueId},
                item_desc = ${description},
                price = ${price},
                sale_price = ${salePrice},
                item_weight = ${weight},
                crte_tm = NOW(),
                crte_by_acct_key = ${createByAccountKey},
                act_ind = ${1}
        `;

        const result = await db.query(query).catch(err => { throw err; });

        return result;
    },
    getItem: async (id) => {
        let query = SQL`
            SELECT
                *
            FROM
                item
            WHERE
                id = ${id}
                AND act_ind = ${1}
        `;

        let result = await db.query(query).catch(err => { throw err; });

        return result;
    },
}