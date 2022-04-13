import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import ProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import AppHeader from './Layout/AppHeader';

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $id: ID!,
        $name: String!,
        $price: Float!,
        $salePrice: Float,
        $weight: Float,
        $productImages: [ProductImage],
        $description: String,
    ) {
        updateItem(
            id: $id,
            name: $name,
            price: $price,
            salePrice: $salePrice,
            weight: $weight,
            description: $description,
            productImages: $productImages
        ) {
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


const Product = ({ data: { getItem: item } }) => {
    const router = useRouter();
    const initialState = {
        edit: false,
        name: item.item_title,
        price: (item.price / 100).toFixed(2),
        salePrice: item.sale_price ? (item.sale_price / 100).toFixed(2) : '',
        description: item.item_desc ? item.item_desc : '',
        weight: item.item_weight ? item.item_weight : '',
        errorMessages: {
            price: "",
            salePrice: "",
            weight: "",
            description: "",
        },
    };

    const [updateItem, { loading }] = useMutation(UPDATE_ITEM_MUTATION, {
        update(cache, { data: { updateItem } }) {
            const itemInCache = cache.readFragment({
                id: `ProductItem:${updateItem.id}`,
                fragment:  gql`
                    fragment Item on ProductItem {
                        id
                    }
              `,
            });
            if (itemInCache) {
                cache.modify({
                    id: cache.identify(updateItem), // Could also use `ProductItem:${updateItem.id}` for id
                    fields: {
                        item_title() {
                            return updateItem.item_title;
                        },
                        item_desc() {
                            return updateItem.item_desc;
                        },
                        price() {
                            return updateItem.price;
                        },
                        sale_price() {
                            return updateItem.sale_price;
                        },
                        item_weight() {
                            return updateItem.item_weight;
                        },
                        mltmd_url() {
                            return updateItem.mltmd_url;
                        },
                    },
                });
            }
        },
    });
    const [state, setState] = useState(initialState);
    const [productImages, setProductImages] = useState(item.multimedia);
    const {
        name,
        price,
        salePrice,
        weight,
        description,
        errorMessages,
        edit,
    } = state;
    const createTime = new Date(item.crte_tm).getTime();
    const tenMinutesAgo = new Date(Date.now() - 600000).getTime();
    const createdWithinPast10Minutes = createTime > tenMinutesAgo;

    const submitForm = async (e) => {
        const { id } = e.target;
        try {
            // Update $ to cents
            const data = {
                id: item.id,
                name,
                price: parseFloat(price) * 100,
                salePrice: parseFloat(salePrice) * 100,
                weight: parseFloat(weight),
                description: description ? description : null,
                productImages: productImages.map((image, index) => ({
                    id: image.id,
                    multimediaUrl: image.mltmd_url,
                    displayCount: index + 1,
                    multimediaXrefId: image.multimedia_xref_id ? image.multimedia_xref_id : null,
                })),
            }
            await updateItem({ variables: data });

            switch (id) {
                case "save-return-to-list": {
                    // @Todo update to return to page with the product
                    router.push({
                        pathname: "/products",
                        query: { page: 1 },
                    });
                    break;
                }
                case "save-create-new": {
                    router.push({
                        pathname: "/product/add",
                    });
                    // @Todo toggle successAlert true state value to display success alert with option to view new product
                    break;
                }
                default: {
                    // Force getServerSideProps to refresh
                    router.replace(router.asPath);
                    setState({
                        ...state,
                        edit: false,
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
            // @Todo: Error handle
        }
    }

    const renderButton = () => {
        const missingRequiredFields = !name || !price;
        const errorMessagePresent = errorMessages.price || errorMessages.salePrice || errorMessages.weight || errorMessages.description;
        const disabled = missingRequiredFields || errorMessagePresent;

        if (!edit) {
            return null
        }
        return (
            <SaveProductButton
                submitForm={submitForm}
                disabled={disabled}
                cancel={cancel}
                loading={loading}
            />
        );
    }

    const cancel = () => {
        setState(initialState);
        setProductImages(item.multimedia);
    }

    const updateProductImages = (multimedia) => {
        setProductImages(multimedia);
        setState({
            ...state,
            edit: true,
        });
    }
    return (
        <Page
            render={({ toggleSideBar, client }) => {
                return ( <AppHeader client={client} text={!edit ? "Update Product" : ""} toggleSideBar={toggleSideBar} btnPosition="left" render={renderButton}/>);
            }}
        >
            <ProductPageContent>
                <Body>
                    {createdWithinPast10Minutes &&
                        <NewProductAlert/>
                    }
                    <ProductForm
                        state={state}
                        setState={setState}
                        productImages={productImages}
                        setProductImages={updateProductImages}
                    />
                </Body>
            </ProductPageContent>
        </Page>
    );
};

const StyledAlert = styled.div`
    box-sizing: border-box;
    padding: 1rem 1.5rem;
    background-color: white;
    border-radius: 4px;
    border-left: 4px solid #4285f4;
    width: 100%;
    max-width: 680px;
    margin: 0rem auto 3rem auto;
    font-size: 1.3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    .check-circle {
        width: 30px;
        height: 30px;
        padding: .5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4285f4;
        color: white;
        border-radius: 50%;
        margin-right: 1.5rem;
        .checkIcon {
            border-radius: 50%;
            font-size: 1.5rem;
        }
    }
    div, span {
        display: inline-block;
    }
`;
// Potentially Create a Toast Alert Instead
const NewProductAlert = () => {
    return (
        <StyledAlert>
            <div className="check-circle"><i className="fas fa-check checkIcon"></i></div>
            <span>Product Successfully Added</span>
        </StyledAlert>
    );
}
export default Product;


// Previous Way of Updating Cache after update mutation
// As of Apollo 3.3 this won't work anymore with missing fields so use cache.modify instead
// const itemInCache = cache.readFragment({
//     id: `ProductItem:${updateItem.id}`,
//     fragment:  gql`
//         fragment Item on ProductItem {
//             id
//             item_uid
//             item_title
//             item_desc
//             price
//             sale_price
//             item_weight
//             mltmd_url
//         }
//   `,
// });
// if (itemInCache) {
//     cache.writeFragment({
//         id: `ProductItem:${updateItem.id}`,
//         fragment:  gql`
//             fragment Item on ProductItem {
//                 id
//                 item_uid
//                 item_title
//                 item_desc
//                 price
//                 sale_price
//                 item_weight
//                 mltmd_url
//             }
//         `,
//         data: updateItem,
//     });
// }

// const createTime = format(new Date(item.crte_tm), 'MMMM dd, yyyy h:mm a');
// tenMinutesAgo = format(tenMinutesAgo, 'MMMM dd, yyyy h:mm a')
