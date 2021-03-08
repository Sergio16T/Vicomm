const {
    getAllAccounts,
    getAccountById,
} = require('../../data-access/account');

module.exports = {
    users: async (parent, args, context, info) => {
        const result = await getAllAccounts();
        return result;
    },
    user: async (parent, args, context, info) => {
        // console.log('request user', context.req.user)
        if (!context.req.user) return null;
        // console.log('user check get', context.req.user.id);
        const user = await getAccountById(context.req.user.id);

        return user;
    },
};