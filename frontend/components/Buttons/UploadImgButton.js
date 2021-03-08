import React from 'react';
import useWindowWidth from '../../lib/Hooks/useWindowWidth';

const UploadImgButton = ({ uploadFile, uploadInput }) => {
    const width = useWindowWidth();

    return (
        <>
            <label id="uploadImgBtn" htmlFor="uploadImg">
                <i className="fas fa-plus-square plusIcon"></i> {width > 600 && "Upload Images"}
            </label>
            <input
                type="file"
                accept="image/*"
                id ="uploadImg"
                name="file"
                className="custom-file-input"
                onChange={uploadFile}
                ref={uploadInput}
            />
        </>
    );
};

export default UploadImgButton;