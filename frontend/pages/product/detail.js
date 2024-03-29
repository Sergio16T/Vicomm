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
            crte_tm,
            multimedia {
                id,
                mltmd_url,
                multimedia_xref_id,
            }
        }
    }
`;

const ProductPage = ({ data, query }) => {
    return <Product data={data} queryParams={query}/>;
}

export async function getServerSideProps({ query: { uid } }) {
    const { data } = await apolloClient.query({
        query: GET_ITEM_QUERY,
        variables: { uid },
        fetchPolicy:  "no-cache",
    });
    return { props: { data } };
}


export default ProductPage;