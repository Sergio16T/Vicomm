import React from 'react';
import Page from './Layout/Page';
import AddProductButton from './Buttons/AddProductButton';

const Products = () => {
    return (
        <Page
        render={() => <AddProductButton/>}
        text="Products"
        >
            <div></div>
        </Page>

    );
};

export default Products;