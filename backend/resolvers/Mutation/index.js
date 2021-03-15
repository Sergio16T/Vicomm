const account = require('./account');
const multimedia = require('./multimedia');
const coverPhoto = require('./coverPhoto');
const item = require('./item');

module.exports = {
    ...account,
    ...coverPhoto,
    ...item,
    ...multimedia,
};
