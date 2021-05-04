const db = require('../db');
const SQL = require('sql-template-strings');

module.exports = {
    createItem: async (params, connection) => {
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

        if (!connection) {
            const result = await db.query(query).catch(err => { throw err; });
            return result;
        } else {
            const result = await connection.query(query).catch(err => { throw err; });
            return result;
        }
    },
    getProductItemsCount: async (accountKey) => {
        let countQuery = SQL`
        SELECT
            count(productItem.id) as count
        FROM
            item productItem
            LEFT OUTER JOIN mltmd_xref mediaXref
                ON mediaXref.src_tbl_key = productItem.id
                AND mediaXref.display_count = ${1}
                AND mediaXref.act_ind = ${1}
            LEFT OUTER JOIN mltmd media
                ON media.id = mediaXref.mltmd_key
                AND media.act_ind= ${1}
        WHERE
            productItem.crte_by_acct_key = ${accountKey}
            AND productItem.act_ind = ${1}
        `;

        const [data] = await db.query(countQuery).catch(err => {
            console.log(err);
            throw err;
        });

        return data;
    },
    getProductItems: async (params) => {
        const {
            accountKey,
            skip,
            numPerPage,
        } = params;

        let query = SQL`
            SELECT
                productItem.id,
                productItem.item_uid,
                productItem.item_title,
                productItem.price,
                productItem.sale_price,
                productItem.item_weight,
                media.mltmd_url
            FROM
                item productItem
                LEFT OUTER JOIN mltmd_xref mediaXref
                    ON mediaXref.src_tbl_key = productItem.id
                    AND mediaXref.display_count = ${1}
                    AND mediaXref.act_ind = ${1}
                LEFT OUTER JOIN mltmd media
                    ON media.id = mediaXref.mltmd_key
                    AND media.act_ind= ${1}
            WHERE
                productItem.crte_by_acct_key = ${accountKey}
                AND productItem.act_ind = ${1}
            LIMIT ${skip}, ${numPerPage};
        `;

        const result = await db.query(query).catch(err => {
            console.log(err);
            throw err;
        });

        return result;
    },
    getItem: async (id, connection) => {
        let query = SQL`
            SELECT
                *
            FROM
                item
            WHERE
                id = ${id}
                AND act_ind = ${1}
        `;

        if (!connection) {
            let result = await db.query(query).catch(err => { throw err; });
            return result;
        } else {
            let result = await connection.query(query).catch(err => { throw err; });
            return result;
        }
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

        let [result] = await db.query(query).catch(err => { throw err; });
        result.crte_tm = result.crte_tm.toISOString();

        return result;
    },
    getItemMultimediaByUID: async (uid) => {
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
                media.mltmd_url,
                mediaXref.display_count,
                mediaXref.id as multimedia_xref_id
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
            ORDER BY
                mediaXref.display_count
        `;

        let result = await db.query(query).catch(err => { throw err; });

        return result;
    },
    getItemMultimediaById: async (id) => {
        let countQuery = SQL`
            SELECT
                COUNT(mediaXref.id) as count
            FROM
                mltmd_xref mediaXref
            WHERE
                mediaXref.src_tbl_key = ${id}
                AND mediaXref.act_ind = ${1}
        `;

        let [data] = await db.query(countQuery).catch(err => { throw err; });

        const { count } = data;

        if (!count) return [];

        let query = SQL`
            SELECT
                media.id,
                media.mltmd_url,
                mediaXref.display_count,
                mediaXref.id as multimedia_xref_id
            FROM
                mltmd_xref mediaXref
                INNER JOIN mltmd media
                    ON media.id = mediaXref.mltmd_key
                    AND media.act_ind= ${1}
            WHERE
                mediaXref.src_tbl_key = ${id}
                AND mediaXref.act_ind = ${1}
            ORDER BY
                mediaXref.display_count
        `;

        let result = await db.query(query).catch(err => { throw err; });

        return result;
    },
    updateItem: async (params) => {
        const {
            id,
            name,
            price,
            salePrice,
            weight,
            description,
            lastUpdateByAccountKey,
        } = params;

        let query = SQL`
            UPDATE
                item
            SET
                item_title = ${name},
                item_desc = ${description},
                price = ${price},
                sale_price = ${salePrice},
                item_weight = ${weight},
                lst_updt_tm = NOW(),
                lst_updt_by_acct_key = ${lastUpdateByAccountKey}
            WHERE
                id = ${id}
                AND act_ind = ${1}
        `;

        const result = await db.query(query).catch(err => { throw err; });

        return result;
    },
}