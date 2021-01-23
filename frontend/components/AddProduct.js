import React from 'react';
import AddProductForm from './Forms/AddProductForm';
import Page from './Layout/Page';

const AddProduct = () => {
    return (
        <Page
            render={() => null}
            text="Add A Product"
        >
                <AddProductForm/>
        </Page>
    );
};

export default AddProduct;