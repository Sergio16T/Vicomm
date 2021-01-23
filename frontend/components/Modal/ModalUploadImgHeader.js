import React from 'react';
import RemoveCoverPhotoBtn from '../Buttons/RemoveCoverPhoto';
import UploadImgButton from '../Buttons/UploadImgButton';

const ModalUploadImgHeader = (props) => {
    return (
        <div className="modal-header">
            <h2>Image Gallery</h2>
            <div className="d-flex">
                {!props.multiSelect  && <RemoveCoverPhotoBtn toggleModal={props.toggleModal}/>}
                <UploadImgButton uploadFile={props.uploadFile} uploadInput={props.uploadInput}/>
                <span className="modal-x" onClick={props.toggleModal}>&times;</span>
            </div>
        </div>
    );
}

export default ModalUploadImgHeader;

