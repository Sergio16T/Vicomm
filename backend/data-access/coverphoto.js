const db = require('../db');
const SQL = require('sql-template-strings');

module.exports = {
    getCoverPhoto: async (id) => {
        const query = SQL`
        SELECT
            mltmd.*
        FROM
            cover_photo,
            mltmd
        WHERE
            cover_photo.acct_key = ${id}
            AND mltmd.id = cover_photo.mltmd_key
            AND cover_photo.act_ind =${1}
        `;

        const [coverPhoto] = await db.query(query);

        return coverPhoto;
    },
    getCoverPhotoId: async (accountKey) => {
        const query = SQL`
        SELECT
            id
        FROM
            cover_photo
        WHERE
            acct_key = ${accountKey}
            AND act_ind = ${1};
        `;

        const [photo] = await db.query(query);

        return photo;
    },
    createNewCoverPhoto: async (params) => {
        const {
            accountKey,
            multimediaKey,
            createByAccountKey,
        } = params;

        const query = SQL `
        INSERT INTO
            cover_photo
        SET
            acct_key = ${accountKey},
            mltmd_key = ${multimediaKey},
            crte_tm = NOW(),
            crte_by_acct_key = ${createByAccountKey},
            act_ind = ${1};
        `;

        const result = await db.query(query);

        return result;
    },
    updateCoverPhoto: async (params) => {
        const {
            accountKey,
            multimediaKey,
            lastUpdateByAccountKey,
        } = params;

        const query = SQL`
            UPDATE
                cover_photo
            SET
                mltmd_key = ${multimediaKey},
                lst_updt_tm = NOW(),
                lst_updt_by_acct_key = ${lastUpdateByAccountKey}
            WHERE
                acct_key = ${accountKey};
            `;

        const result = await db.query(query);

        return result;
    },
    deleteCoverPhoto: async (accountKey) => {
        const query = SQL`
        DELETE FROM
            cover_photo
        WHERE
            acct_key = ${accountKey}
            AND act_ind = ${1};
        `;

        const result = await db.query(query);

        return result;
    },
}