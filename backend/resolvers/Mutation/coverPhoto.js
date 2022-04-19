/*
@TODO
1. Error Handling w/ Apollo Error Class
2. Logging with winston
3. use MYSQL Begin Transaction Commit and Rollback
*/
module.exports = {
    async updateCoverPhoto(parent, args, context, info) {
        const {
            dataSources: {
                coverphotoAPI: {
                    getCoverPhotoId,
                    createNewCoverPhoto,
                    updateCoverPhoto,
                },
            },
        } = context;
        const photo = await getCoverPhotoId(context.userId);

        if (photo) {
            const updatePhotoParams = {
                accountKey: context.userId,
                multimediaKey: args.key,
                lastUpdateByAccountKey: context.userId,
            }
            await updateCoverPhoto(updatePhotoParams);
            return { id: photo.id };
        } else {
            const newPhotoParams = {
                accountKey: context.userId,
                multimediaKey: args.key,
                createByAccountKey: context.userId,
            };
            const { insertId } = await createNewCoverPhoto(newPhotoParams);
            return { id: insertId };
        }
    },
    async removeCoverPhoto(parent, args, context, info) {
        const {
            dataSources: {
                coverphotoAPI: {
                    deleteCoverPhoto,
                },
            },
        } = context;
        await deleteCoverPhoto(context.userId);
        return { message: "Successfully Deleted Cover Photo" };
    },
};