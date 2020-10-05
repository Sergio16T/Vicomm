import React, { useState, useCallback, useRef } from 'react';
import { useMutation } from '@apollo/client';
import {useDropzone} from 'react-dropzone'
import { UPLOAD_IMG_MUTATION } from './GalleryModal'; 
import { ProductPageContent, Body, Form  } from './Styles/ProductStyles'; 
import ImageGalleryModal from './GalleryModal'; 
import DropZone from './Styles/DropZoneStyles'; 
import LoadingDots from './Styles/LoadingDots'; 
import ScrollGallery from './ScrollGallery'; 

const AddProductForm = ({ toggleModal, modalOpen, setSpinner}) => {
    const [state, setState] = useState({
        name: "",
        price: "",
        salePrice: "",
        weight: "", 
    }); 
    const [selectedImages, setImages] = useState([]); 
    const [uploadImageToGallery] = useMutation(UPLOAD_IMG_MUTATION, { refetchQueries: ["GET_IMG_GALLERY"]}); 
    const [ loadingDots, setLoading ] = useState(false); 
    const [productImages, setProductImages] = useState([]); 
    const dropInput = useRef(); 

    const onDrop = useCallback(async (acceptedFiles) => {
        if(!acceptedFiles.length) {
            // no files provided set error message
            console.log('no files'); 
            return; 
        }
        setLoading(true); 
        const data = new FormData(); 
        data.append('file', acceptedFiles[0]); 
        data.append('upload_preset', 'Vicomm'); 
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dddnhychw/image/upload', {
                method: 'POST', 
                body: data  
            }); 
            const file = await res.json(); 
            if(file.hasOwnProperty('error')) throw file.error.message; 
            const { data: { uploadImageToGallery: image }} = await uploadImageToGallery({ variables: { 
                image: file.secure_url, 
                largeImage: file.eager[0].secure_url
             }}).catch(err => { 
                 throw err; 
             }); 
            dropInput.current.value= ""; 
            setImages([image]);
            setLoading(false); 
        } catch(err) {
            console.log(err);
            setLoading(false); 
        }
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
        setImages(Object.values(selected));
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
                        {loadingDots && 
                            <LoadingDots>
                                <div class="spinner">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>
                            </LoadingDots>
                        }
                        <i className="fas fa-camera-retro retroCam"></i>
                        <p id="dragNdrop-p">Drag & Drop To Upload</p>
                        <div className="line-break-container">
                            <span className="lineBreak"></span>
                            <span id="or-text">or </span>
                            <span className="lineBreak"></span>
                        </div>
                        <button type="button" className="browse-btn" onClick={toggleModal}><i className="fas fa-images imgIcon"></i>Browse Gallery</button>
                        <input {...getInputProps()} ref={dropInput}/>
                    </DropZone>
                    <ScrollGallery 
                    selectedImages={selectedImages}
                    setImages={setImages}
                    productImages={productImages}
                    setProductImages={setProductImages}
                    />
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


export default AddProductForm; 