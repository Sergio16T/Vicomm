import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import AddProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';
import ErrorMessage from './Modal/Error';

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

/* get aggregate count of product items in a query to be able to determine
if updating cache is necessary after creating item (READ QUERY to see if last page already cached) */

const AddProduct = () => {
    const [createItem, { loading }] = useMutation(CREATE_ITEM_MUTATION);
    const router = useRouter();
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
    const [error, setError] = useState(false);
    const {
        name,
        price,
        salePrice,
        weight,
        description,
        errorMessages,
        edit,
    } = state;


    const submitForm = async (e) => {
        const { id } = e.target;
        try {
            // Update $ to cents
            const data = {
                name,
                price: parseFloat(price),
                salePrice: parseFloat(salePrice),
                weight: parseFloat(weight),
                description: description ? description : null,
                productImages: productImages.map((image, index) => ({ id: image.id, multimediaUrl: image.mltmd_url, displayCount: index + 1 })),
            }
            const { data: { createItem: { item_uid } } } = await createItem({ variables: data });

            switch (id) {
                case "save-return-to-list": {
                    router.push({
                        pathname: "/products",
                        query: { page: 1 },
                    });
                    break;
                }
                case "save-create-new": {
                    resetForm();
                    // toggle successAlert true state value to display success alert with option to view new product
                    break;
                }
                default: {
                    router.push({
                        pathname: "/product/detail",
                        query: { uid: item_uid },
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
            setError(err);
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
                cancel={resetForm}
                loading={loading}
            />
        );
    }

    const resetForm = () => {
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

    const reset = () => {
        setError(false);
        resetForm();
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
            <ProductPageContent>
                <ErrorMessage
                    reset={reset}
                    error={error}
                />
                <Body>
                    <AddProductForm
                        state={state}
                        setState={setState}
                        productImages={productImages}
                        setProductImages={setProductImages}

                    />
                </Body>
            </ProductPageContent>
        </Page>
    );
};


export default AddProduct;