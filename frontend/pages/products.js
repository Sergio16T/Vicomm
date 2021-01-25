import React from 'react';
import withApollo from '../lib/ApolloClient';
import Products from '../components/Products';

const ProductsPage = () => {
    return (
        <Products/>
    );
};


export default withApollo(ProductsPage);