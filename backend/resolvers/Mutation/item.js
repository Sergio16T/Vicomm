const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { createItem, getItem, updateItem, getItemMultimediaById } = require('../../data-access/item');
const { createMultimediaXref, updateMultimediaXrefDisplayCount, deleteMultimediaXref } = require('../../data-access/multimedia');

module.exports = {
    createItem: async (parent, args, context, info) => {
        const randomBytesPromiseified = promisify(randomBytes);
        const uid = (await randomBytesPromiseified(24)).toString('hex');
        // 1) create product item record
        const { insertId } = await createItem({
            ...args,
            uniqueId: uid,
            createByAccountKey: context.req.user.id,
        });
        // 2) create multimedia xref records to point images to product item
        const { productImages } = args;
        for (let i = 0; i < productImages.length; i++) {
            // need to add a display count to these images so mltmd_xref needs a display count table value
            await createMultimediaXref({
                createByAccountKey: context.req.user.id,
                displayCount: productImages[i].displayCount,
                multimediaKey: productImages[i].id,
                sourceTableKey: insertId,
                sourceTableName: 'item',
            });
        }
        // 3) query for product item
        const [item] = await getItem(insertId);
        // 4) return product item
        return {
            ...item,
            multimedia: productImages,
        };
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

        return item;
    },
}