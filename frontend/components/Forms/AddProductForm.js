import React, { useState, useCallback, useRef, useContext } from 'react';
import { useMutation } from '@apollo/client';
import {useDropzone} from 'react-dropzone'
import { UPLOAD_IMG_MUTATION } from '../Modal/GalleryModal';
import { ProductPageContent, Body, Form } from '../Styles/ProductStyles';
import Modal from '../Modal/Modal';
import ImageGalleryModal from '../Modal/GalleryModal';
import DropZone from '../Styles/DropZoneStyles';
import LoadingDots from '../SpinKit/LoadingDots';
import ScrollGallery from '../ScrollGallery';
import { PageContext } from '../Layout/Page';

// refactor selectedImages and productImages to use useReducer hook
const AddProductForm = () => {
    const { toggleModal, modalOpen, setSpinner} = useContext(PageContext);
    const [state, setState] = useState({
        name: "",
        price: "",
        salePrice: "",
        weight: "",
        description: ""
    });
    const [selectedImages, setImages] = useState([]);
    const [uploadImageToGallery] = useMutation(UPLOAD_IMG_MUTATION, { refetchQueries: ["GET_IMG_GALLERY"]});
    const [ loadingDots, setLoading ] = useState(false);
    const [productImages, setProductImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const dropInput = useRef();

    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles.length) {
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
            if (file.hasOwnProperty('error')) throw file.error.message;
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
                if (value > 1000) setState({...state, [name]: 1000});
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

    const toggleImageGalleryModal = () => {
        toggleModal();
        setActiveIndex(0);
    }

    const toggleCropPhotoModal = (img) => {
        console.log(img);
        toggleModal();
        setActiveIndex(1);
    }
    return (
        <ProductPageContent>
            <Body>
                <Form>
                    <div className="flex-row mobile-row">
                        <div className="formCol mb-0">
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
                    </div>
                    <div className="flex-row">
                        <div className="flex-group mobile-row">
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
                        <div className="formCol mobile-row">
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
                    <div className="form-container">
                        <DropZone {...getRootProps({
                            onClick: event => event.stopPropagation()
                        })}>
                            {loadingDots && <LoadingDots/>}
                            <i className="fas fa-camera-retro retroCam"></i>
                            <p id="dragNdrop-p">Drag & Drop To Upload</p>
                            <div className="line-break-container">
                                <span className="lineBreak"></span>
                                <span id="or-text">or </span>
                                <span className="lineBreak"></span>
                            </div>
                            <button type="button" className="browse-btn" onClick={toggleImageGalleryModal}><i className="fas fa-images imgIcon"></i>Browse Gallery</button>
                            <input {...getInputProps()} ref={dropInput}/>
                        </DropZone>
                    </div>
                    <ScrollGallery
                        selectedImages={selectedImages}
                        setImages={setImages}
                        productImages={productImages}
                        setProductImages={setProductImages}
                        toggleCropPhotoModal={toggleCropPhotoModal}
                    />
                    <div className="descriptionRow">
                        <div className="desc-form-row">
                            <label htmlFor="description">
                                    Description
                            </label>
                            <textarea
                                type="text"
                                name="description"
                                id="description"
                                value={state.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </Form>
            </Body>
            <Modal
                show={modalOpen}
                modalXColor="white"
                activeIndex={activeIndex}
            >
                <ImageGalleryModal
                    toggleModal={toggleModal}
                    setSpinner={setSpinner}
                    multiSelect
                    useMLTMD={useMLTMD}
                />
                 <div className="modal-content">

                 </div>
            </Modal>
        </ProductPageContent>
    );
}


export default AddProductForm;