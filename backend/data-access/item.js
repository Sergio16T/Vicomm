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
    getItemDetailsByUID: async (uid) => {
        let query = SQL`
            SELECT
               *
            FROM
                item
            WHERE
                item_uid = ${uid}
                AND act_ind = ${1}
        `;

        let result = await db.query(query).catch(err => { throw err; });

        return result;
    },
    getItemMultimedia: async (uid) => {
        let countQuery = SQL`
            SELECT
                COUNT(media.id) as count
            FROM
                item productItem
                LEFT OUTER JOIN mltmd_xref mediaXref
                    ON mediaXref.src_tbl_key = productItem.id
                    AND mediaXref.act_ind = ${1}
                LEFT OUTER JOIN mltmd media
                    ON media.id = mediaXref.mltmd_key
                    AND media.act_ind= ${1}
            WHERE
                productItem.item_uid = ${uid}
                AND productItem.act_ind = ${1}
        `;
        let [data] = await db.query(countQuery).catch(err => { throw err; });
        const { count } = data;
        if (!count) return [];

        let query = SQL`
            SELECT
                media.id,
                media.mltmd_url
            FROM
                item productItem
                LEFT OUTER JOIN mltmd_xref mediaXref
                    ON mediaXref.src_tbl_key = productItem.id
                    AND mediaXref.act_ind = ${1}
                LEFT OUTER JOIN mltmd media
                    ON media.id = mediaXref.mltmd_key
                    AND media.act_ind= ${1}
            WHERE
                productItem.item_uid = ${uid}
                AND productItem.act_ind = ${1}
        `;

        let result = await db.query(query).catch(err => { throw err; });

        return result;
    },
}