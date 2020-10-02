import React from 'react'; 
import useWindowWidth from '../lib/Hooks/useWindowWidth'; 
import RemoveCoverPhotoBtn from './RemoveCoverPhoto'; 

const ModalUploadImgHeader = (props) => {
    const { width } = useWindowWidth(); 

    return (
        <div className="modal-header">
            <h2>Image Gallery</h2>
            <div className="d-flex">
                {!props.multiSelect  && <RemoveCoverPhotoBtn toggleModal={props.toggleModal}/>}
                <label id="uploadImgBtn" htmlFor="uploadImg"> 
                    <i className="fas fa-plus-square plusIcon"></i> {width > 600 && "Upload Images"}
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
        </div>
    )
}

export default ModalUploadImgHeader; 

