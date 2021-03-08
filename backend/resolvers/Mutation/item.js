
const { createItem } = require('../../data-access/item');

module.exports = {
    createItem: async (parent, args, context, info) => {
        console.log('args', args);
        return { message: "Success" }
    },
}