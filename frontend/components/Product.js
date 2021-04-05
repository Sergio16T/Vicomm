import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import ProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
            id
        }
    }
`;


const Product = ({ data: { getItem: item } }) => {
    const router = useRouter();
    const initialState = {
        edit: false,
        name: item.item_title,
        price: item.price,
        salePrice: item.sale_price ? item.sale_price : '',
        description: item.item_desc ? item.item_desc : '',
        weight: item.item_weight ? item.item_weight : '',
        errorMessages: {
            price: "",
            salePrice: "",
            weight: "",
            description: "",
        },
    };

    /* TO DO - write update function to update the cache for GET_PRODUCT_ITEMS_QUERY.
    Check if item ID in the cached result and replace with updated item if present */

    const [updateItem, { loading }] = useMutation(UPDATE_ITEM_MUTATION);
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
    const missingRequiredFields = !name || !price;
    const errorMessagePresent = errorMessages.price || errorMessages.salePrice || errorMessages.weight || errorMessages.description;
    const createTime = new Date(item.crte_tm).getTime();
    const tenMinutesAgo = new Date(Date.now() - 600000).getTime();
    const createdWithinPast10Minutes = createTime > tenMinutesAgo;

    const submitForm = async (e) => {
        const { id } = e.target;
        // Update $ to cents
        const data = {
            id: item.id,
            name,
            price: parseFloat(price),
            salePrice: parseFloat(salePrice),
            weight: parseFloat(weight),
            description: description ? description : null,
            productImages: productImages.map((image, index) => ({
                id: image.id,
                multimediaUrl: image.mltmd_url,
                displayCount: index + 1,
                multimediaXrefId: image.multimedia_xref_id ? image.multimedia_xref_id : null,
            })),
        }
        await updateItem({ variables: data }).catch(err => {
            console.log(err.message);
            // TO DO: Error handle
        });

        switch (id) {
            case "save-return-to-list": {
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
                // toggle successAlert true state value to display success alert with option to view new product
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
    }

    const renderButton = () => {
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
            renderData = {{
                appBar: {
                    render: renderButton,
                    renderPosition: "left",
                    text: !edit ? "Update Product" : "",
                },
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


// const createTime = format(new Date(item.crte_tm), 'MMMM dd, yyyy h:mm a');
// tenMinutesAgo = format(tenMinutesAgo, 'MMMM dd, yyyy h:mm a')
