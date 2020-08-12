import React from 'react';
import styled from 'styled-components'; 

const Modal = (props) => {
    return (
        <StyledModal show={props.show}>
            <div>
                <span className="modal-x" onClick={props.toggleModal}>&times;</span>
            </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
    position: absolute; 
    width: 60vw; 
    max-width: 700px; 
    /* height: 70vh;  */
    min-height: 380px; 
    top: 50%; 
    left: 50%; 
    transform: ${props => props.show ? "translate(-50%, -50%)" : "translate(-50%, -300%)"};
    background: white; 
    box-shadow: ${props => props.theme.bs}; 
    transition: .4s ease; 
    z-index: 121; 
    border-radius: 6px; 
    .modal-x {
        position: absolute; 
        top: 10px; 
        right: 25px; 
        font-size: 2.4rem; 
        opacity: .6; 
        &:hover {
            cursor: pointer;
            opacity: 1; 
        }
    }
    @media (max-width: 800px) {
        width: 90vw; 
    }

`; 
export default Modal;