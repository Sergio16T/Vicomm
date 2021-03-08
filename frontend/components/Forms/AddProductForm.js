import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {useDropzone} from 'react-dropzone'
import { UPLOAD_IMG_MUTATION } from '../Modal/GalleryModal';
import { ProductPageContent, Body, Form } from '../Styles/ProductStyles';
import Modal from '../Modal/Modal';
import ImageGalleryModal from '../Modal/GalleryModal';
import CropPhotoModal from '../Modal/CropPhotoModal';
import DropZone from '../Styles/DropZoneStyles';
import LoadingDots from '../SpinKit/LoadingDots';
import ScrollGallery from '../ScrollGallery';
import { PageContext } from '../Layout/Page';

// refactor selectedImages and productImages to use useReducer hook
const AddProductForm = (props) => {
    const { toggleModal, modalOpen, setSpinner} = useContext(PageContext);
    const {
        state,
        state: {
            errorMessages,
            description,
            name,
            price,
            salePrice,
            weight,
        },
        setState,
        productImages,
        setProductImages,
    } = props;
    const [uploadImageToGallery] = useMutation(UPLOAD_IMG_MUTATION, { refetchQueries: ["GET_IMG_GALLERY"]});
    const [selectedImages, setImages] = useState([]);
    const [ loadingDots, setLoading ] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [cropImage, setCropImage] = useState({
        img: null,
        index: null,
    });
    const dropInput = useRef();

    useEffect(() => {
        if (!modalOpen && cropImage.img) {
            setTimeout(() => {
                setCropImage({
                    img: null,
                    index: null,
                });
            }, 401);
        }
    }, [modalOpen, cropImage.img]);

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
                body: data,
            });
            const file = await res.json();
            if (Object.prototype.hasOwnProperty.call(file, "error")) throw file.error.message;
            const { data: { uploadImageToGallery: image }} = await uploadImageToGallery({
                variables: {
                    image: file.secure_url,
                    largeImage: file.eager[0].secure_url,
                },
            });
            dropInput.current.value= "";
            setImages([image]);
            setLoading(false);
        } catch(err) {
            console.log(err);
            setLoading(false);
        }
    }, [uploadImageToGallery, setImages]);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "weight": {
                if (value <= 1000) {
                    let regEx = /^\d*\.?\d{0,2}$/;
                    setState({
                        ...state,
                        [name]: value,
                        edit: true,
                        errorMessages: {
                            ...state.errorMessages,
                            [name]: regEx.test(value) ? "" : "Only 2 decimal points",
                        },
                    });
                } else if (value > 1000) {
                    setState({
                        ...state,
                        [name]: 1000,
                        edit: true,
                        errorMessages: {
                            ...state.errorMessages,
                            [name]: "",
                        },
                    });
                }
                break;
            }
            case "price": {
                let priceRegEx = /^\d*\.?\d{0,2}$/;
                setState({
                    ...state,
                    [name]: value,
                    edit: true,
                    errorMessages: {
                        ...state.errorMessages,
                        [name]: !priceRegEx.test(value) ?  "Only 2 decimal points" : "",
                    },
                });
                break;
            }
            case "salePrice": {
                let salePriceRegEx = /^\d*\.?\d{0,2}$/;
                setState({
                    ...state,
                    [name]: value,
                    edit: true,
                    errorMessages: {
                        ...state.errorMessages,
                        [name]: !salePriceRegEx.test(value) ? "Only 2 decimal points" : "",
                    },
                });
                break;
            }
            default:
                setState({
                    ...state,
                    edit: true,
                    [name]:value,
                });
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 69) {
            e.preventDefault();
        }
    }

    const useMLTMD = (selected, cb) => {
        setImages(Object.values(selected));
        cb({});
        toggleModal();
    }

    const toggleImageGalleryModal = () => {
        setActiveIndex(0);
        toggleModal();
    }

    const toggleCropPhotoModal = (img, index) => {
        setCropImage({
            img,
            index,
        });
        setActiveIndex(1);
        toggleModal();
    }

    const updateProductImages = (id, mltmd_url) => {
        const newProductImages = [...productImages];
        newProductImages.splice(cropImage.index, 1, {
            id,
            mltmd_url,
        });
        setProductImages(newProductImages);
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
                                value={name}
                                onChange={handleInputChange}
                                required
                            />
                            <label className={`${name ? "active-content": ""} p-label `} htmlFor="name">
                                Name
                            </label>
                            {!name &&
                                <div className="required-label">
                                    <i className="fas fa-exclamation-triangle"></i>&nbsp;
                                    Name is required
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="flex-group mobile-row">
                            <div className="formCol row2">
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={price}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    step=".01"
                                    required
                                />
                                <label className={`${price ? "active-content": ""} p-label `} htmlFor="price">
                                        Price
                                </label>
                                {!price &&
                                    <div className="required-label">
                                        <i className="fas fa-exclamation-triangle"></i>&nbsp;
                                        Price is required
                                    </div>
                                }
                                {errorMessages.price &&
                                    <div className="label-error">
                                        <i className="fas fa-exclamation-triangle"></i>&nbsp; {errorMessages.price}
                                    </div>
                                }
                            </div>
                            <div className="formCol">
                                <input
                                    type="number"
                                    name="salePrice"
                                    id="salePrice"
                                    value={salePrice}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    step=".01"
                                />
                                <label className={`${salePrice ? "active-content": ""} p-label `} htmlFor="salePrice">
                                    Sale Price
                                </label>
                                {errorMessages.salePrice &&
                                    <div className="label-error">
                                        <i className="fas fa-exclamation-triangle"></i>&nbsp; {errorMessages.salePrice}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="formCol mobile-row">
                            <input
                                type="number"
                                name="weight"
                                id="productWeight"
                                value={weight}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                min="0"
                                max="1000"
                                step=".01"
                                required
                            />
                            <label className={`${weight ? "active-content" : ""} p-label row2`} htmlFor="productWeight">
                                Weight
                            </label>
                            <span className="input-addOn">lbs.</span>
                            {errorMessages.weight &&
                                <div className="label-error">
                                    <i className="fas fa-exclamation-triangle"></i>&nbsp; {errorMessages.weight}
                                </div>
                            }
                        </div>

                    </div>
                    <div className="form-container">
                        <DropZone {...getRootProps({
                            onClick: event => event.stopPropagation(),
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
                                value={description}
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
                    show={modalOpen}
                    toggleModal={toggleModal}
                    setSpinner={setSpinner}
                    multiSelect
                    useMLTMD={useMLTMD}
                />
                <CropPhotoModal
                    modalOpen={modalOpen}
                    imageUrl={cropImage.img}
                    toggleModal={toggleModal}
                    setSpinner={setSpinner}
                    updateProductImages={updateProductImages}
                />
            </Modal>
        </ProductPageContent>
    );
}


export default AddProductForm;

// restricting input to two decimal points
// substr(startIndex, numberOfCharactersToExtract)
// let input = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
// setState({
//     ...state,
//     [name]: input,
//     errorMessages: {
//         ...state.errorMessages,
//         [name]: ""
//     }
// });