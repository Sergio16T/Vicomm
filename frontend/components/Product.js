import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import ProductForm from './Forms/ProductForm';
import SaveProductButton from './Buttons/SaveProductButton';
import Page from './Layout/Page';
import { ProductPageContent, Body } from './Styles/ProductStyles';
import styled from 'styled-components';

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
    const createTime = new Date(item.crte_tm);
    const tenMinutesAgo = new Date(Date.now() - 600000);
    const createdWithinPast10Minutes = createTime > tenMinutesAgo;

    const submitForm = async () => {
        // Update $ to cents
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
            <ProductPageContent>
                <Body>
                    {createdWithinPast10Minutes &&
                        <NewProductAlert/>
                    }
                    <ProductForm
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

const StyledAlert = styled.div`
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
