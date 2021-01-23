import React from 'react';

const ToggleImageGalleryBtn = ({ toggleModal }) => {
    return (
        <img id="uploadImageIcon" onClick={toggleModal} src="https://res.cloudinary.com/dddnhychw/image/upload/v1596157219/Full%20Stack%20App/untitled_6_saqq66.svg"/>
    );
}

export default ToggleImageGalleryBtn;