const { getItemDetailsByUID, getItemMultimediaByUID, getProductItems } = require('../../data-access/item');

module.exports = {
    getItem: async (parent, args, context, info) => {
        const item = await getItemDetailsByUID(args.uid);
        const multimedia = await getItemMultimediaByUID(args.uid);
        return {
            ...item,
            multimedia,
        };
    },
    getProductItems: async (parent, args, context, info) => {
        const numPerPage = 10;
        const productItems = await getProductItems({
            accountKey: context.req.user.id,
            skip: args.page * numPerPage - numPerPage,
            numPerPage,
        });

        return productItems;
    },
}