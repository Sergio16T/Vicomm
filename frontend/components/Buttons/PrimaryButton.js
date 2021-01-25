import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
        outline: none;
        border: none;
        border-radius: 6px;
        background: rgb(255,171,0);
        padding: .8rem 1rem;
        color: white;
        font-size: 1.3rem;
        margin-right: 30px;
        cursor: pointer;
`;
const PrimaryButton = ({ onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            Save New Image
        </StyledButton>
    );
};

export default PrimaryButton;