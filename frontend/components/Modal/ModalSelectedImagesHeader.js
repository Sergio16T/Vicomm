import React from 'react';
import { StyledImgSelectedHeader, StyledFaIcon } from '../Styles/ImageGalleryStyles';
import TooltipInfo from '../TooltipInfo';
import styled from 'styled-components';

const ModalImgSelectedHeader = ({ count, deleteMultimedia, useMLTMD, selected, setSelected, multiSelect }) => {
    return (
        <StyledImgSelectedHeader>
            <span className="selected-count">{count} selected</span>
            <div className="iconButtonList">
                <StyledFaIcon onClick={deleteMultimedia} selected>
                    <i className="fas fa-trash"></i>
                    <TooltipInfo
                    text={`Delete Selected Image${multiSelect ? "s" : ""}`}
                    />
                </StyledFaIcon>
                <Button
                    text="Use"
                    useMLTMD={useMLTMD}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>

        </StyledImgSelectedHeader>
    )
}

const StyledBtn = styled.button`
        outline: none;
        border: none;
        border-radius: 6px;
        background: rgb(255,171,0);
        padding: .8rem 1.5rem;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
                background-repeat: no-repeat;
                background-position: 50%;
                transform: scale(10,10);
                opacity: 0;
                transition: transform .5s, opacity 1s;
            }
            &:active:after {
                transform: scale(0,0);
                opacity: .2;
                transition: 0s;
            }
`;
const Button = ({ text, useMLTMD, selected, setSelected }) => {
    return (
        <StyledBtn onClick={() => useMLTMD(selected, setSelected)}>
            {text}
        </StyledBtn>
    )
}

export default ModalImgSelectedHeader;