const { getAccountMultiMedia  } = require('../../data-access/multimedia');
const { getCoverPhoto  } = require('../../data-access/coverphoto');

module.exports = {
    getImageGallery: async(parent, args, context, info) => {
        const mediaGallery = await getAccountMultiMedia(context.req.user.id);
        return mediaGallery;
    },
    getCoverPhoto: async(parent, args, context, info) => {
        const coverPhoto = await getCoverPhoto(context.req.user.id);
        return coverPhoto;
    },
}