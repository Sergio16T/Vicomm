import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';
import AddProductButton from './Buttons/AddProductButton';
import ProductTable from './Table/ProductTable';

const GET_PRODUCT_ITEMS_QUERY = gql`
    query GET_PRODUCT_ITEMS_QUERY($page: Int!) {
        getProductItems(page: $page) {
            result {
                id,
                item_uid,
                item_title,
                item_desc,
                price,
                sale_price,
                item_weight,
                mltmd_url,
            },
            count,
        }
    }
`;

const Products = ({ query: { page } }) => {
    const { data, loading, fetchMore } = useQuery(GET_PRODUCT_ITEMS_QUERY, {
        variables: {
            page: parseInt(page),
        },
    });

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
            <ProductPageContent>
                <Body>
                    <ProductTable
                        fetchMore={fetchMore}
                        loading={loading}
                        productItems={data ? data.getProductItems.result : null}
                        count={data ? data.getProductItems.count : null}
                    />
                </Body>
            </ProductPageContent>

        </Page>

    );
};

export default Products;