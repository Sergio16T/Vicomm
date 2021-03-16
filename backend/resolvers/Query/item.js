const { getItemDetailsByUID, getItemMultimedia } = require('../../data-access/item');

module.exports = {
    getItem: async (parent, args, context, info) => {
        const item = await getItemDetailsByUID(args.uid);
        const multimedia = await getItemMultimedia(args.uid);
        return {
            ...item,
            multimedia,
        };
    },
}