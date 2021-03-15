import React, { useEffect, useRef, Fragment } from 'react';
import { StyledModal } from '../Styles/GalleryModalStyles';
import { ModalBackDrop } from '../Styles/PageStyles';
import Spinner from '../SpinKit/ChaseSpinner';

const Modal = ({ children, setModalOpen, show, spinner, style }) => {
    const modalBackDrop = useRef(null);
    const { minHeight, xColor } = style;

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.contains(modalBackDrop.current)) {
                setModalOpen(false);
                document.querySelector('body').style.overflow = '';
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [setModalOpen]);

    return (
        <Fragment>
            <ModalBackDrop
                isOpen={show}
                ref={modalBackDrop}
            />
            <StyledModal
                show={show}
                modalXColor={xColor}
                minHeight={minHeight}
            >
                {children}
            </StyledModal>
            <Spinner
                show={show}
                spinner={spinner}
                minHeight={minHeight}
            />
        </Fragment>
    );
};

export default Modal;