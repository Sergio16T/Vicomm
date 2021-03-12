const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { createItem, getItem } = require('../../data-access/item');
const { createMultimediaXref } = require('../../data-access/multimedia');

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
            await createMultimediaXref({
                createByAccountKey: context.req.user.id,
                multimediaKey: productImages[i].id,
                sourceTableKey: insertId,
                sourceTableName: 'item',
            });
        }
        // 3) query for product item
        const [item] = await getItem(insertId);
        // 4) return product item
        return item;
    },
}