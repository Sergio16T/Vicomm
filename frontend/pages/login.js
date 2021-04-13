import React from 'react';
import withApollo from '../lib/ApolloClient';
import SignIn from '../components/SignIn';

const Login = () => {
    return (
        <SignIn/>
    );
}

export default withApollo(Login);