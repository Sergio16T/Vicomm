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
            userId,
        } = context;
        if (!userId) { return null; }

        const user = await accountAPI.getAccountById(userId);
        return user;
    },
};