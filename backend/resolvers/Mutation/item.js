const { randomBytes } = require('crypto');
const { promisify } = require('util');

const {
    startTransaction,
    rollBack,
    commitChanges,
} = require('../../data-access/utilities');
const { INTERNAL_SERVER_ERROR } = require('../../lib/ApolloError');
const logger = require('../../lib/logger');

module.exports = {
    createItem: async (parent, args, context, info) => {
        const {
            dataSources: {
                itemAPI: {
                    createItem,
                    getItem,
                },
                multimediaAPI: {
                    createMultimediaXref,
                },
            },
        } = context;
        let item;
        let connection;
        const { productImages } = args;

        const randomBytesPromiseified = promisify(randomBytes);
        const uid = (await randomBytesPromiseified(24)).toString('hex');

        try {
            // 0) Get MYSQL connection and start transaction
            connection = await startTransaction();
            // 1) create product item record
            const { insertId } = await createItem({
                ...args,
                uniqueId: uid,
                createByAccountKey: context.userId,
            }, connection);
            // 2) create multimedia xref records to point images to product item
            for (let i = 0; i < productImages.length; i++) {
                // if (i === 1) {
                //     console.log('A: Test Roll Back!');
                //     throw new Error('Testing Roll Back!');
                // }

                await createMultimediaXref({
                    createByAccountKey: context.userId,
                    displayCount: productImages[i].displayCount,
                    multimediaKey: productImages[i].id,
                    sourceTableKey: insertId,
                    sourceTableName: 'item',
                }, connection);
            }
            // 3) query for product item
            [item] = await getItem(insertId, connection);

            //4) commit DB changes
            await commitChanges(connection);

            // 5) return product item
            return {
                ...item,
                multimedia: productImages,
            };
        } catch (err) {
            logger.error(err.message);
            await rollBack(connection);
            throw new INTERNAL_SERVER_ERROR(err.message);
        } finally {
            await connection.release();
        }
    },
    /*
    @TODO
    1. Error Handling w/ Apollo Error Class
    2. Error Logging with winston
    3. use MYSQL Begin Transaction Commit and Rollback --> updateItem
    */
    updateItem: async (parent, args, context, info) => {
        const {
            dataSources: {
                itemAPI: {
                    getItem,
                    updateItem,
                    getItemMultimediaById,
                },
                multimediaAPI: {
                    createMultimediaXref,
                    updateMultimediaXrefDisplayCount,
                    deleteMultimediaXref,
                },
            },
        } = context;
        const { productImages } = args;
        const incomingXrefIds = [];

        // 1) update item details
        await updateItem({
            ...args,
            lastUpdateByAccountKey: context.userId,
        });

        // 2) determine if there are any deleted images
        productImages.forEach(image => {
            incomingXrefIds.push(parseInt(image.multimediaXrefId));
        });

        const previousMultimedia = await getItemMultimediaById(args.id);

        const deletedImages = previousMultimedia.filter(multimedia =>  !incomingXrefIds.includes(multimedia.multimedia_xref_id));

        logger.debug('deleted', deletedImages);
        // 3) Delete the multimedia xref records from the deletedImages list
        for (let k = 0; k < deletedImages.length; k++) {
            const image = deletedImages[k];
            await deleteMultimediaXref(image.multimedia_xref_id);
        }
        //4) If applicable loop through the incoming images and update image display order or create new records
        for (let i = 0; i < productImages.length; i++) {
            const {
                displayCount,
                id,
                multimediaXrefId,
            } = productImages[i];

            if (multimediaXrefId) {
                await updateMultimediaXrefDisplayCount({
                    multimediaXrefId,
                    displayCount,
                    lastUpdateByAccountKey: context.userId,
                });
            } else {
                await createMultimediaXref({
                    createByAccountKey: context.userId,
                    displayCount: displayCount,
                    multimediaKey: id,
                    sourceTableKey: args.id,
                    sourceTableName: 'item',
                });
            }
        }

        const [item] = await getItem(args.id);

        return {
            ...item,
            mltmd_url: productImages.length ? productImages[0].multimediaUrl : null,
        };
    },
}