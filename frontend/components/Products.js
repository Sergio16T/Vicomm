import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';
import AddProductButton from './Buttons/AddProductButton';
import ProductTable from './Table/ProductTable';
import ErrorMessage from './Modal/Error';
import { useRouter } from 'next/router';

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
    const { data, loading, fetchMore, error } = useQuery(GET_PRODUCT_ITEMS_QUERY, {
        variables: {
            page: parseInt(page),
        },
        errorPolicy: 'all', // `all` - Both data and error.graphQLErrors are populated, enabling you to render both partial results and error information.
    });
    const router = useRouter();

    const render = () => <AddProductButton/>;

    const reset = () => {
        router.push({
            pathname: "/dashboard",
        });
    }

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
                <ErrorMessage
                    error={error}
                    reset={reset}
                    text="Back to dashboard"
                />
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