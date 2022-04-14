const { getAccountMultiMedia  } = require('../../data-access/multimedia');
const { getCoverPhoto  } = require('../../data-access/coverphoto');

module.exports = {
    getImageGallery: async(parent, args, context, info) => {
        const mediaGallery = await getAccountMultiMedia(context.userId);
        return mediaGallery;
    },
    getCoverPhoto: async(parent, args, context, info) => {
        const coverPhoto = await getCoverPhoto(context.userId);
        return coverPhoto;
    },
}