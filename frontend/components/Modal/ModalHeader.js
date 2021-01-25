import React from 'react';


const ModalHeader = ({ header, toggleModal, render }) => {
    return (
        <div className="modal-header">
            <h2>{header}</h2>
            <div className="d-flex">
                {render()}
                <span className="modal-x" onClick={toggleModal}>&times;</span>
            </div>
        </div>
    );
}

export default ModalHeader;

