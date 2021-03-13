import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import ProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';

// TO DO
const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION {
        updateItem {
            id
        }
    }
`;


const Product = ({ data: { getItem: item } }) => {
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
    const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);
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

    const submitForm = async () => {
        const data = {
            name,
            price: parseFloat(price),
            salePrice: parseFloat(salePrice),
            weight: parseFloat(weight),
            description: description ? description : null,
            productImages: productImages.map(image => ({ id: image.id, mltmd_url: image.mltmd_url })),
        }
        const result = await updateItem({ variables: data }).catch(err => {
            console.log(err.message);
            // TO DO: Error handle
        });
        console.log(result);
    }

    const renderButton = () => {
        const disabled = missingRequiredFields || errorMessagePresent;
        if (!edit) {
            return null
        }
        return (
            <SaveProductButton
                onClick={submitForm}
                disabled={disabled}
                cancel={cancel}
            />
        );
    }

    const cancel = () => {
        setState(initialState);
        setProductImages(item.multimedia);
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
            <ProductForm
                state={state}
                setState={setState}
                productImages={productImages}
                setProductImages={setProductImages}
            />
        </Page>
    );
};

export default Product;