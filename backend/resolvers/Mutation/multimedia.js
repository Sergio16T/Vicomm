const {
    createNewMultimedia,
    deleteMultimedia,
    getMultimediaById,
} = require('../../data-access/multimedia');

module.exports = {
    async uploadImageToGallery(parent, args, context, info) {
        const newMediaParams = {
            act_ind: 1,
            id: context.req.user.id,
            image: args.image,
            largeImage: args.largeImage,
        };

        const { insertId } = await createNewMultimedia(newMediaParams);

        const multimedia = await getMultimediaById(insertId);

        return multimedia;
    },
    async deleteImages(parent, args, context, info) {
        for (let i = 0; i < args.keys.length; i++) {
            let key = parseInt(args.keys[i]);

            await deleteMultimedia(key);
        }
        return {
            keys: args.keys,
        };
    },
};