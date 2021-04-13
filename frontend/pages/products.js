import React from 'react';
import Products from '../components/Products';

const ProductsPage = ({ query }) => {
    return (
        <Products query={query}/>
    );
};


export default ProductsPage;