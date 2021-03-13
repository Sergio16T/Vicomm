import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import AddProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
            $name: String!,
            $price: Float!,
            $salePrice: Float,
            $weight: Float,
            $productImages: [ProductImage],
            $description: String,
        ) {
        createItem(
            name: $name,
            price: $price,
            salePrice: $salePrice,
            weight: $weight,
            description: $description,
            productImages: $productImages
        ) {
            id,
            item_uid
        }
    }
`;

const AddProduct = () => {
    const [createItem] = useMutation(CREATE_ITEM_MUTATION);
    const [state, setState] = useState({
        edit: false,
        name: "",
        price: "",
        salePrice: "",
        weight: "",
        description: "",
        errorMessages: {
            price: "",
            salePrice: "",
            weight: "",
            description: "",
        },
    });
    const [productImages, setProductImages] = useState([]);
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
        const { data: { createItem: { item_uid } } } = await createItem({ variables: data }).catch(err => {
            console.log(err.message);
            // TO DO: Error handle
        });
        Router.push({
            pathname: `/product/detail`,
            query: { uid: item_uid, new: 'Y'  },
        });
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
        setState({
            edit: false,
            name: "",
            price: "",
            salePrice: "",
            weight: "",
            description: "",
            errorMessages: {
                price: "",
                salePrice: "",
                weight: "",
                description: "",
            },
        });
        setProductImages([]);
    }

    return (
        <Page
            renderData = {{
                appBar: {
                    render: renderButton,
                    renderPosition: "left",
                    text: !edit ? "Add A Product" : "",
                },
            }}
        >
            <AddProductForm
                state={state}
                setState={setState}
                productImages={productImages}
                setProductImages={setProductImages}

            />
        </Page>
    );
};


export default AddProduct;