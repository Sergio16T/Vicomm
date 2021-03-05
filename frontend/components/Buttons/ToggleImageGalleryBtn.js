import React, { useContext } from 'react';
import { PageContext } from '../Layout/Page';

const ToggleImageGalleryBtn = () => {
    const { toggleModal } = useContext(PageContext);
    return (
        <img id="uploadImageIcon" onClick={toggleModal} src="https://res.cloudinary.com/dddnhychw/image/upload/v1596157219/Full%20Stack%20App/untitled_6_saqq66.svg"/>
    );
}

export default ToggleImageGalleryBtn;