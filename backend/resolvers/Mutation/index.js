const account = require('./account');
const multimedia = require('./multimedia');
const coverPhoto = require('./coverPhoto');

module.exports = {
    ...account,
    ...multimedia,
    ...coverPhoto
};
