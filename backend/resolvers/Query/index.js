const user = require('./user');
const multimedia = require('./multimedia');

module.exports = {
    ...user,
    ...multimedia,
};