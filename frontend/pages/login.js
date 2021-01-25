import React from 'react';
import WithApollo from '../lib/ApolloClient';
import SignIn from '../components/SignIn';

const Login = () => {
    return (
        <SignIn/>
    );
}

export default WithApollo(Login);