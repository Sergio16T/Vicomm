import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import AddProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';

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

    const submitForm = async (e) => {
        const { id } = e.target;
        // Update $ to cents
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

        switch (id) {
            case "save-return-to-list": {
                router.push({
                    pathname: "/products",
                });
                break;
            }
            case "save-create-new": {
                resetForm();
                // toggle successAlert true state value to display success alert with option to view new product
                break;
            }
            default: {
                // instead of adding new query param just check on the client if create time is within the last 10 minutes to determine whether to show alert or not
                router.push({
                    pathname: "/product/detail",
                    query: { uid: item_uid, new: "Y" },
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
                cancel={resetForm}
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