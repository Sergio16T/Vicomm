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
        // console.log('request user', context.req.user);
        if (!req.user) return null;
        // console.log('user check get', context.req.user.id);
        const user = await accountAPI.getAccountById(req.user.id);
        // console.log(user);
        return user;
    },
};