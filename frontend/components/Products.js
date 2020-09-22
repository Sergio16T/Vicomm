import React from 'react';
import Page from './Page'; 
import ImageGalleryModal from './GalleryModal'; 

const Products = (props) => {
    return (
        <Page
        render={() => <AddProductButton/>}>
            {({ modalOpen, toggleModal, userData, setSpinner }) => {

            }}
        </Page>
        
    );
};

const AddProductButton = (props) => {
    return null;
}
export default Products;