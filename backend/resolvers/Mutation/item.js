const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { createItem, getItem, updateItem, getItemMultimediaById } = require('../../data-access/item');
const { createMultimediaXref, updateMultimediaXrefDisplayCount, deleteMultimediaXref } = require('../../data-access/multimedia');
const { startTransaction, rollBack, commitChanges } = require('../../data-access/utilities');

/*
@TODO
1. Error Handling w/ Apollo Error Class
2. Logging with winston
3. use MYSQL Begin Transaction Commit and Rollback --> updateItem
*/

module.exports = {
    createItem: async (parent, args, context, info) => {
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
                createByAccountKey: context.req.user.id,
            }, connection);
            // 2) create multimedia xref records to point images to product item
            for (let i = 0; i < productImages.length; i++) {
                // if (i === 1) {
                //     console.log('A: Test Roll Back!');
                //     throw new Error('Testing Roll Back!');
                // }

                await createMultimediaXref({
                    createByAccountKey: context.req.user.id,
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
            console.log(err);
            await rollBack(connection);
            throw err;
        } finally {
            await connection.release();
        }
    },
    updateItem: async (parent, args, context, info) => {
        const { productImages } = args;
        const incomingXrefIds = [];

        // 1) update item details
        await updateItem({
            ...args,
            lastUpdateByAccountKey: context.req.user.id,
        });

        // 2) determine if there are any deleted images
        productImages.forEach(image => {
            incomingXrefIds.push(parseInt(image.multimediaXrefId));
        });

        const previousMultimedia = await getItemMultimediaById(args.id);

        const deletedImages = previousMultimedia.filter(multimedia =>  !incomingXrefIds.includes(multimedia.multimedia_xref_id));

        console.log('deleted', deletedImages);
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
                    lastUpdateByAccountKey: context.req.user.id,
                });
            } else {
                await createMultimediaXref({
                    createByAccountKey: context.req.user.id,
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