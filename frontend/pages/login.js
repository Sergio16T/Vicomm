import React from 'react';
import WithApollo from '../lib/ApolloClient'; 
import SignIn from '../components/SignIn'; 

const login = (props) => {
    return (
        <SignIn/>
    )
}

export default WithApollo(login);