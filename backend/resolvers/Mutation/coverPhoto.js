const {
    getCoverPhotoId,
    createNewCoverPhoto,
    deleteCoverPhoto,
    updateCoverPhoto,
} = require('../../data-access/coverphoto');

module.exports = {
    async updateCoverPhoto(parent, args, context, info) {
        const photo = await getCoverPhotoId(context.req.user.id);

        if (photo) {
            const updatePhotoParams = {
                accountKey: context.req.user.id,
                multimediaKey: args.key,
                lastUpdateByAccountKey: context.req.user.id,
            }
            await updateCoverPhoto(updatePhotoParams);
            return { id: photo.id };
        } else {
            const newPhotoParams = {
                accountKey: context.req.user.id,
                multimediaKey: args.key,
                createByAccountKey: context.req.user.id,
            };
            const { insertId } = await createNewCoverPhoto(newPhotoParams);
            return { id: insertId };
        }
    },
    async removeCoverPhoto(parent, args, context, info) {
        await deleteCoverPhoto(context.req.user.id);
        return { message: "Successfully Deleted Cover Photo" };
    },
};