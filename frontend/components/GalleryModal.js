import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'; 
import { StyledModal } from './Styles/GalleryModalStyles'; 
import ImageGallery from './ImageGallery'; 
import ImgSelectedHeader from './ModalSelectedImagesHeader'; 
import UploadImgHeader from './ModalUploadImgHeader'; 

const GET_IMG_GALLERY = gql`
    query GET_IMG_GALLERY{
        getImageGallery {
            MLTMD_KEY
            MLTMD_URL
        }
    }
`; 

const UPLOAD_IMG_MUTATION = gql`
    mutation UPLOAD_IMG_MUTATION($image: String!, $largeImage: String!) {
        uploadImageToGallery(image: $image, largeImage: $largeImage) {
            message
        }
    }
`; 

const DELETE_IMGS_MUTATION = gql`
    mutation DELETE_IMGS_MUTATION($keys: [ID]) {
        deleteImages(keys: $keys) {
            message
        }
    }
`; 

const UploadImageModal = (props) => {
    const {loading, data} = useQuery(GET_IMG_GALLERY); 
    const [uploadImageToGallery] = useMutation(UPLOAD_IMG_MUTATION, { refetchQueries: ['GET_IMG_GALLERY']}); 
    const [deleteImages] = useMutation(DELETE_IMGS_MUTATION, { refetchQueries: ['GET_IMG_GALLERY']});
    const [selected, setSelected] = useState({}); 
    const [count, setCount] = useState(0); 
    const uploadInput = useRef(); 

    useEffect(() => {
        !props.show && setSelected({}); 
    },[props.show]); 
    
    const handleSelect = (image) => {
        switch(props.multiSelect) {
            case true: 
                let selectedImages = {...selected}; 
                if(image.MLTMD_KEY in selectedImages) delete selectedImages[image.MLTMD_KEY]; 
                else selectedImages[image.MLTMD_KEY] = image; 
                setSelected(selectedImages); 
                setCount(Object.keys(selectedImages).length);
                break; 
            default: 
                selectedImages = {...selected}; 
                let imageDeleted = false; 
                if(image.MLTMD_KEY in selectedImages) {
                    delete selectedImages[image.MLTMD_KEY]; 
                    imageDeleted = true; 
                }
                if(!imageDeleted) selectedImages = {}; 
                if(!imageDeleted) selectedImages[image.MLTMD_KEY] = image; 
                setSelected(selectedImages); 
                setCount(Object.keys(selectedImages).length);
        }
    }

    const uploadFile = async (e) => {
        const files = e.target.files; 
        const data = new FormData(); 
        data.append('file', files[0]); 
        data.append('upload_preset', 'Vicomm'); 
        try {
            props.setSpinner(true); 
            const res = await fetch('https://api.cloudinary.com/v1_1/dddnhychw/image/upload', {
                method: 'POST', 
                body: data  
            }); 
            const file = await res.json(); 
            if(file.hasOwnProperty('error')) throw file.error.message; 
            await uploadImageToGallery({ variables: { 
                image: file.secure_url, 
                largeImage: file.eager[0].secure_url
             }}).catch(err => { 
                 throw err; 
             }); 
            uploadInput.current.value= ""; 
            props.setSpinner(false); 
        }
        catch(err) {
            console.log(err); 
            props.setSpinner(false); 
        }
    }
    const deleteMultimedia = async () => {
        props.setSpinner(true); 
        setTimeout( async () => { 
            await deleteImages({ variables: { keys: Object.keys(selected) }});
            setSelected({}); 
            props.setSpinner(false); 
        }, 500); 
      
    }
    return (
        <StyledModal show={props.show} modalXColor={props.modalXColor}>
                {!Object.keys(selected).length ? 
                    <UploadImgHeader 
                    uploadInput={uploadInput}
                    uploadFile={uploadFile}
                    toggleModal={props.toggleModal}
                    />
                : 
                    <ImgSelectedHeader
                    count={count}
                    deleteMultimedia={deleteMultimedia}
                    useMLTMD={props.useMLTMD}
                    setSelected={setSelected}
                    selected={selected}
                    />
                }
         
                <div className="modal-content">
                    {!loading && 
                        <ImageGallery
                         multiMedia ={data.getImageGallery}
                        //  multiMedia ={[]}
                         handleSelect={handleSelect}
                         selected={selected}
                         />
                    }
                </div>
        </StyledModal>
    )
}




export default UploadImageModal;
