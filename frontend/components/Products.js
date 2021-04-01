import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Page from './Layout/Page';
import AddProductButton from './Buttons/AddProductButton';

const GET_PRODUCT_ITEMS_QUERY = gql`
    query GET_PRODUCT_ITEMS_QUERY($page: Int!) {
        getProductItems(page: $page) {
            id,
            item_uid,
            item_title,
            item_desc,
            price,
            sale_price,
            item_weight,
            mltmd_url,
        }
    }
`;

const Products = () => {
    const { data } = useQuery(GET_PRODUCT_ITEMS_QUERY, {
        variables: {
            page: 1,
        },
    });
    console.log(data);
    const render = () => <AddProductButton/>;
    return (
        <Page
            renderData = {{
                appBar: {
                    render,
                    renderPosition: "right",
                    text: "Products",
                },
            }}
        >
            <div></div>
        </Page>

    );
};

export default Products;