import React from 'react';
import { StyledModal } from '../Styles/GalleryModalStyles';

const Modal = ({ children, activeIndex, show, modalXColor }) => {
    return (
        <StyledModal show={show} modalXColor={modalXColor}>
            {children.length > 1 ? children[activeIndex] : children}
        </StyledModal>
    );
};

export default Modal;