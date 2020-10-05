import React from 'react';
import AddProductForm from './AddProductForm'; 
import Page from './Page';


const AddProducts = () => {
    return (
        <Page
        render={() => null}
        text="Add A Product"
        >
            {({ modalOpen, toggleModal, setSpinner }) => 
                <AddProductForm toggleModal={toggleModal} modalOpen={modalOpen} setSpinner={setSpinner}/>
            }
        </Page>
    );
};



export default AddProducts;