import React from 'react';
import styled from 'styled-components';


const StyledErrorAlert = styled.div`
    background-color: rgb(253, 237, 237);
    margin: .5rem 0;
    padding: 1rem 2rem;
    border-radius: 6px;
    display flex;
    span, i {
        color: #ef5350;
        font-size: 1.1rem;
    }
    span {
        display: flex;
        align-items: baseline;
    }
    i {
        padding-right: 1rem;
    }
`;

const StyledInfoAlert = styled.div`
    background-color: rgb(229, 246, 253);
    border-radius: 6px;
    margin: .5rem 0;
    padding: 1.2rem 1rem;
    span, i {
        color: rgb(1, 67, 97);
        font-size: 1.1rem;
    }
    i {
        padding-right: 1rem;
    }
`;


const ErrorAlert = ({ message }) => {
    return (
        <StyledErrorAlert>
            <i className="fas fa-exclamation-triangle" id="alert-icon"></i>
            <span>{message}</span>
        </StyledErrorAlert>
    );
}

const InfoAlert = ({ message }) => {
    return (
        <StyledInfoAlert>
            <i className="fas fa-info-circle"></i> <span>{message}</span>
        </StyledInfoAlert>
    );
}

export {
    ErrorAlert,
    InfoAlert,
};