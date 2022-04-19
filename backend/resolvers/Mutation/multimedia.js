/*
@TODO
1. Error Handling w/ Apollo Error Class
2. Logging with winston
3. use MYSQL Begin Transaction Commit and Rollback
*/

module.exports = {
    async uploadImageToGallery(parent, args, context, info) {
        const {
            dataSources: {
                createNewMultimedia,
                getMultimediaById,
            },
        } = context;
        const newMediaParams = {
            act_ind: 1,
            id: context.userId,
            image: args.image,
            largeImage: args.largeImage,
        };

        const { insertId } = await createNewMultimedia(newMediaParams);

        const multimedia = await getMultimediaById(insertId);

        return multimedia;
    },
    async deleteImages(parent, args, context, info) {
        const {
            dataSources: {
                deleteMultimedia,
            },
        } = context;

        for (let i = 0; i < args.keys.length; i++) {
            let key = parseInt(args.keys[i]);

            await deleteMultimedia(key);
        }
        return {
            keys: args.keys,
        };
    },
};