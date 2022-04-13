import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql, useQuery } from '@apollo/client';
import AddProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';
import ErrorMessage from './Modal/Error';
import { GET_PRODUCT_ITEMS_QUERY } from './Products';
import AppHeader from './Layout/AppHeader';

const PRODUCT_ITEMS_AGGREGATE_QUERY = gql`
    query PRODUCT_ITEMS_AGGREGATE_QUERY{
        productItemsAggregate {
            count
        }
    }
`;

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
    // data given default value of object with count 0
    const { data: { count } = { count: 0 } } = useQuery(PRODUCT_ITEMS_AGGREGATE_QUERY);
    const [createItem, { loading }] = useMutation(CREATE_ITEM_MUTATION, {
        refetchQueries: [{
            query: GET_PRODUCT_ITEMS_QUERY,
            variables: { page: Math.ceil((count + 1)/10) || 1 },
        }, {
            query: PRODUCT_ITEMS_AGGREGATE_QUERY,
        }],
    });
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
                price: parseFloat(price) * 100,
                salePrice: parseFloat(salePrice) * 100,
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
                    // @Todo toggle successAlert true state value to display success alert with option to view new product
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
            render={({ toggleSideBar, client }) => {
                return ( <AppHeader client={client} text={!edit ? "Add A Product" : ""} toggleSideBar={toggleSideBar} btnPosition="left" render={renderButton}/>);
            }}
        >
            <ProductPageContent>
                <ErrorMessage
                    reset={reset}
                    error={error}
                    text="Try Again"
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