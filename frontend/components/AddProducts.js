import React, { useState, useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import Page from './Page';
import { ProductPageContent, Body, Form  } from './Styles/ProductStyles'; 
import ImageGalleryModal from './GalleryModal'; 
import DropZone from './Styles/DropZoneStyles'; 

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
const AddProductForm = ({ toggleModal, modalOpen, setSpinner}) => {
    const [state, setState] = useState({
        name: "",
        price: "",
        salePrice: "",
        weight: "", 
    }); 
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles); 
    }, []); 
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop}); 

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        switch(name) {
            case "weight":
                if(value > 1000) setState({...state, [name]: 1000}); 
                else setState({...state, [name]:value}); 
                break;
            default: 
            setState({...state, [name]:value}); 
        }
      
    }
    const useMLTMD = (selected, cb) => {
        console.log(selected);
        cb({}); 
        toggleModal(); 
    }
    return (
        <ProductPageContent>
            <Body>
                <Form>
                    <div className="formRow">
                        <input
                        type="text"
                        name="name"
                        id="name"
                        value={state.name}
                        onChange={handleInputChange}
                        required
                        />
                          <label className={`${state.name ? "active-content": ""} p-label `} htmlFor="name">
                            Name
                        </label>
                    </div>
                    <div className="flex-row">
                        <div className="flex-group">
                            <div className="formCol">
                                <input
                                type="number"
                                name="price"
                                id="price"
                                value={state.price}
                                onChange={handleInputChange}
                                required
                                />
                                <label className={`${state.price ? "active-content": ""} p-label `} htmlFor="price">
                                    Price
                                </label>
                            </div>
                            <div className="formCol">
                                <input
                                type="number"
                                name="salePrice"
                                id="salePrice"
                                value={state.salePrice}
                                onChange={handleInputChange}
                                required
                                />
                                <label className={`${state.salePrice ? "active-content": ""} p-label `} htmlFor="salePrice">
                                    Sale Price
                                </label>
                            </div>
                        </div>
                        <div className="formCol">
                            <input
                            type="number"
                            name="weight"
                            id="productWeight"
                            value={state.weight}
                            onChange={handleInputChange}
                            min="0"
                            max="1000"
                            required
                            />
                            <label className={`${state.weight ? "active-content": ""} p-label `} htmlFor="productWeight">
                                Weight
                            </label>
                            <span className="input-addOn">lbs.</span>
                        </div>
                      
                    </div>
                    <DropZone {...getRootProps({
                        onClick: event => event.stopPropagation()
                    })}>
                        <i className="fas fa-camera-retro retroCam"></i>
                        <p id="dragNdrop-p">Drag & Drop To Upload</p>
                        <div className="line-break-container">
                            <span className="lineBreak"></span>
                            <span id="or-text">or </span>
                            <span className="lineBreak"></span>
                        </div>
                        <button type="button" className="browse-btn" onClick={toggleModal}><i className="fas fa-images imgIcon"></i>Browse Gallery</button>
                        <input {...getInputProps()}/>
                    </DropZone>
                </Form>
            </Body>
            <ImageGalleryModal 
            show={modalOpen} 
            toggleModal={toggleModal}
            modalXColor={"white"}
            setSpinner={setSpinner}
            multiSelect
            useMLTMD={useMLTMD}
            />
        </ProductPageContent>
    ); 
}


export default AddProducts;