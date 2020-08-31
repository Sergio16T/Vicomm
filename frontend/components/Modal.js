import React, { useState, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'; 
import styled from 'styled-components'; 
import Spinner from './Spinner'; 

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

const UploadImageModal = (props) => {
    const {loading, data} = useQuery(GET_IMG_GALLERY); 
    const [uploadImageToGallery] = useMutation(UPLOAD_IMG_MUTATION, { refetchQueries: ['GET_IMG_GALLERY']}); 
    const [spinner, setSpinner] = useState(false); 
    const uploadInput = useRef(); 

    const uploadFile = async (e) => {
        const files = e.target.files; 
        const data = new FormData(); 
        data.append('file', files[0]); 
        data.append('upload_preset', 'Vicomm'); 
        try {
            setSpinner(true); 
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
            setSpinner(false); 
        }
        catch(err) {
            console.log(err); 
            setSpinner(false); 
        }
    }
    return (
        <StyledModal show={props.show} modalXColor={props.modalXColor}>
                <ModalHeader>
                    <UploadImgHeader 
                    uploadInput={uploadInput}
                    uploadFile={uploadFile}
                    toggleModal={props.toggleModal}
                    />
                    
                </ModalHeader>
      
                <div className="modal-content">
                    <Spinner spinner={spinner}/>
                    {!loading && props.children({ data: data })}
                </div>
        </StyledModal>
    )
}

const ModalHeader = (props) => {
    return (
        <div className="modal-header">
            {props.children}
        </div>
    )
}
const UploadImgHeader = (props) => {
    return (
        <React.Fragment>
            <h2>Image Gallery</h2>
            <div className="d-flex">
                <label id="uploadImgBtn" htmlFor="uploadImg"> 
                    <i className="fas fa-plus-square plusIcon"></i> Upload Images
                </label>
                <input
                type="file"
                accept="image/*"
                id ="uploadImg" 
                name="file" 
                className="custom-file-input"
                onChange={props.uploadFile}
                ref={props.uploadInput}
                />
                <span className="modal-x" onClick={props.toggleModal}>&times;</span>
            </div>
        </React.Fragment>
    )
}
const StyledModal = styled.div`
    position: fixed; 
    width: 60vw; 
    max-width: 700px; 
    overflow: scroll; 
    height: 400px; 
    /* min-height: 300px;  */
    margin: auto;
    top: 100px; 
    left: 0; 
    right: 0; 
    transform: ${props => props.show ? "translate(0, 0%)" : "translate(0, -200%)"};
    opacity: ${props => props.show ? 1 : 0};
    display: ${props => props.show ? "none" : "block"};
    box-shadow: ${props => props.theme.bs}; 
    background: white; 
    transition: .4s ease; 
    z-index: 121; 
    border-radius: 6px; 
    display: flex; 
    flex-direction: column; 
    .modal-content {
        position: absolute; 
        padding-top: 60px; 
        /* top: 60px;  */
        width: 100%; 
        /* height: calc(100% - 60px); */
        /* height: 100%; */
        /* min-height: calc(100% - 60px);  */
        border-bottom-right-radius: 6px; 
        border-bottom-left-radius: 6px; 
    }
    .modal-header {
        position: sticky;
        width: 100%; 
        height: 60px;
        background: ${props => props.theme.skyBlue};
        top: 0; 
        left: 0; 
        display: flex; 
        align-items: center;
        justify-content: space-between;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        z-index: 2; 
        h2 {
            font-size: 1.4rem; 
            text-transform: uppercase; 
            font-weight: 500; 
            padding: 0 1rem; 
            margin: 0;
            color:white;
        }
    }
    #uploadImgBtn {
        outline: none; 
        border: none;
        border-radius: 6px; 
        background: rgb(255,171,0); 
        padding: .8rem;
        color: white; 
        font-size: 1.3rem; 
        margin-right: 30px; 
        cursor: pointer;
        .plusIcon {
            padding-right: .5rem;
        }

    }
    .d-flex {
        display: flex; 
    }
    #uploadImg {
        position: absolute;
        border: 0;
        height: 1px;
        width: 1px;
        white-space: nowrap;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
    }
    .modal-x {
        margin-right: 20px; 
        font-size: 2.4rem; 
        opacity: .6; 
        color: ${props => props.modalXColor}; 
        z-index: 4; 
        &:hover {
            cursor: pointer;
            opacity: 1; 
        }
    }
    .modal-body {
        width: 100%; 
        height: 100%; 
    }
    @media (max-width: 800px) {
        width: 90vw; 
    }

`; 
export default UploadImageModal;
