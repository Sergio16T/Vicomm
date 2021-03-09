const db = require('../db');
const SQL = require('sql-template-strings');

module.exports = {
    createItem: async (params) => {
        const {
            description,
            name,
            price,
            salePrice,
            weight,
            accountKey,
        } = params;

        let query = SQL`
            INSERT INTO
                item
            SET
                item_title = ${name},
                item_desc = ${description},
                price = ${price},
                sale_price = ${salePrice},
                item_weight = ${weight},
                crte_tm = NOW(),
                crte_by_acct_key = ${accountKey},
                act_ind = ${1}
        `;

        const result = await db.query(query).catch(err => { throw err; });

        return result;
    },
}