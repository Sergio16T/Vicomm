import React from 'react';
import Page from './Layout/Page';

const Product = () => {
    return (
        <Page
            renderData = {{
                appBar: {
                    text: "Update Product",
                },
            }}
        >

        </Page>
    );
};

export default Product;