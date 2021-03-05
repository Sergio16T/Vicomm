import React from 'react';
import Page from './Layout/Page';
import AddProductButton from './Buttons/AddProductButton';

const Products = () => {
    const render = () => <AddProductButton/>;
    return (
        <Page
            renderData = {{
                appBar: {
                    render,
                    renderPosition: "right",
                    text: "Products"
                },
            }}
        >
            <div></div>
        </Page>

    );
};

export default Products;