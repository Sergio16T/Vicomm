import React from 'react'; 
import { StyledImgSelectedHeader } from './Styles/ImageGalleryStyles'; 
import styled from 'styled-components'; 

const ModalImgSelectedHeader = ({ count, deleteMultimedia }) => {
    return (
        <StyledImgSelectedHeader>
            <span className="selected-count">{count} selected</span>
            <div className="iconButtonList">
                <button className="faIconBtn" onClick={deleteMultimedia}>
                    <i className="fas fa-trash"></i>
                    <TooltipInfo
                    text="Delete Selected Images"
                    />
                </button>
                <Button 
                text="Use"/>
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
const Button = (props) => {
    return (
        <StyledBtn>
            {props.text}
        </StyledBtn>
    )
}  
const TooltipInfo = (props) => {
    return (
       <div className="tooltiptext">
           {props.text}
        </div>
    ); 
}
export default ModalImgSelectedHeader; 