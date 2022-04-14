const { getItemDetailsByUID, getItemMultimediaByUID, getProductItems, getProductItemsCount } = require('../../data-access/item');

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
        const { count } = await getProductItemsCount(context.userId);
        if (!count) {
            return {
                result: [],
                count,
            };
        }
        const productItems = await getProductItems({
            accountKey: context.userId,
            skip: args.page * numPerPage - numPerPage,
            numPerPage,
        });

        return {
            result: productItems,
            count,
        };
    },
    productItemsAggregate: async (parent, args, context, info) => {
        const data = await getProductItemsCount(context.userId);
        return data;
    },
}