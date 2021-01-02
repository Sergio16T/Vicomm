import React from 'react';
import AddProductForm from './AddProductForm';
import Page from './Page';


const AddProducts = () => {
    return (
        <Page
            render={() => null}
            text="Add A Product"
        >
                <AddProductForm/>
        </Page>
    );
};



export default AddProducts;