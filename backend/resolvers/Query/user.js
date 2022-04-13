module.exports = {
    users: async (parent, args, context, info) => {
        const {
            dataSources: {
                accountAPI,
            },
        } = context;
        const result = await accountAPI.getAllAccounts();
        return result;
    },
    user: async (parent, args, context, info) => {
        const {
            dataSources: {
                accountAPI,
            },
            req,
        } = context;
        if (!req.user) return null;

        const user = await accountAPI.getAccountById(req.user.id);
        return user;
    },
};