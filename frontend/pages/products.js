import React from 'react';
import withApollo from '../lib/ApolloClient';
import Products from '../components/Products';

const ProductsPage = ({ query }) => {
    return (
        <Products query={query}/>
    );
};


export default withApollo(ProductsPage);