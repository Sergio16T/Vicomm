import React from 'react';
import Product from '../../components/Product';
import { apolloClient } from "../../lib/ApolloClient";
import { gql } from '@apollo/client';


const GET_ITEM_QUERY = gql`
    query GET_ITEM_QUERY ($uid: String!) {
        getItem(uid: $uid) {
            id,
            item_uid,
            item_title,
            item_desc,
            item_weight,
            price,
            sale_price,
            multimedia {
                id,
                mltmd_url,
            }
        }
    }
`;

const ProductPage = ({ data }) => {
    return <Product data={data} />;
}

export async function getServerSideProps({ params: { uid } }) {
    const { data } = await apolloClient.query({
        query: GET_ITEM_QUERY,
        variables: { uid },
    });
    return { props: { data } };
}


export default ProductPage;