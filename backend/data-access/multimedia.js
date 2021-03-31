const db = require('../db');
const SQL = require('sql-template-strings');

module.exports = {
    getMultimediaById: async (id) => {
        let query = SQL`
        SELECT
            *
        FROM
            mltmd
        WHERE
            id = ${id};
        `;

        const [multimedia] = await db.query(query).catch(err => { throw err; });

        return multimedia;
    },
    createNewMultimedia: async (params) => {
        const {
            act_ind,
            id,
            image,
            largeImage,
        } = params;

        let query = SQL`
        INSERT INTO
            mltmd
        SET
            mltmd_url = ${image},
            mltmd_lg_url = ${largeImage},
            crte_tm = NOW(),
            crte_by_acct_key = ${id},
            act_ind = ${act_ind}`;

        const result = await db.query(query).catch(err => { throw err; });

        return result;
    },
    deleteMultimedia: async (key) => {
        let query = SQL`
            DELETE FROM
                mltmd
            WHERE
                id = ${key}
        `;

        const result = await db.query(query).catch(err => { throw err });

        return result;
    },
    getAccountMultiMedia: async (id) => {
        let query = SQL`
            SELECT
                *
            FROM
                mltmd
            WHERE
                crte_by_acct_key = ${id}
                AND act_ind = ${1}
            ORDER BY
                crte_tm DESC
            # LIMIT
                # 0, 30
        `;

        const mediaGallery = await db.query(query).catch(err => { throw err; });

        return mediaGallery;
    },
    createMultimediaXref: async (params) => {
        const {
            createByAccountKey,
            displayCount,
            multimediaKey,
            sourceTableKey,
            sourceTableName,
        } = params;

        let query = SQL`
            INSERT INTO
                mltmd_xref
            SET
                mltmd_key = ${multimediaKey},
                src_tbl_key = ${sourceTableKey},
                src_tbl_nm = ${sourceTableName},
                display_count = ${displayCount},
                crte_tm = NOW(),
                crte_by_acct_key = ${createByAccountKey},
                act_ind = ${1}
        `;

        const result = await db.query(query).catch(err => { throw err; });

        return result;
    },
    updateMultimediaXrefDisplayCount: async (params) => {
        const {
            multimediaXrefId,
            displayCount,
            lastUpdateByAccountKey,
        } = params;

        let query = SQL`
        UPDATE
            mltmd_xref
        SET
            display_count = ${displayCount},
            lst_updt_tm = NOW(),
            lst_updt_by_acct_key = ${lastUpdateByAccountKey}
        where
            id = ${multimediaXrefId}
            AND act_ind = ${1}
        `;

        const result = await db.query(query).catch(err => { throw err; });

        return result;
    },

    deleteMultimediaXref: async (id) => {
        let query = SQL`
            DELETE FROM
                mltmd_xref
            WHERE
                id = ${id};
        `;

        const result = await db.query(query).catch(err => { throw err; });

        return result;
    },
};