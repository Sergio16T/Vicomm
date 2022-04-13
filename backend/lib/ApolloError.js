const { ApolloError } = require('apollo-server-errors');

class INTERNAL_SERVER_ERROR extends ApolloError {
    constructor(message) {
        super(message, 'INTERNAL_SERVER_ERROR');

        Object.defineProperty(this, 'name', { value: 'INTERNAL_SERVER_ERROR' });
    }
}

class BAD_USER_INPUT extends ApolloError {
    constructor(message) {
        super(message, 'BAD_USER_INPUT');

        Object.defineProperty(this, 'name', { value: 'BAD_USER_INPUT' });
    }
}

module.exports = {
    INTERNAL_SERVER_ERROR,
    BAD_USER_INPUT,
}