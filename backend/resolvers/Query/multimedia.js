const { getAccountMultiMedia  } = require('../../services/multimedia');
const { getCoverPhoto  } = require('../../services/coverphoto');

module.exports = {
    getImageGallery: async(parent, args, context, info) => {
        const mediaGallery = await getAccountMultiMedia(context.req.user.id);
        return mediaGallery;
    },
    getCoverPhoto: async(parent, args, context, info) => {
        const coverPhoto = await getCoverPhoto(context.req.user.id);
        return coverPhoto;
    }
}