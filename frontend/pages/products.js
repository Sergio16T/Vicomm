import React from 'react';
import withApollo from '../lib/ApolloClient'; 
import Products from '../components/Products'; 

const products = props => {
    return (
        <Products/>
    );
};


export default withApollo(products);