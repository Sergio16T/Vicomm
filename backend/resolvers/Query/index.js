const user = require('./user');
const multimedia = require('./multimedia');
const item = require('./item');

module.exports = {
    ...item,
    ...multimedia,
    ...user,
};