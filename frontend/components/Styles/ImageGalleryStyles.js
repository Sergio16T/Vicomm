import styled from 'styled-components'; 

const StyledGallery = styled.div`
    width: 100%;
    height: 100%;
    display: flex; 
    flex-direction: column; 
    .img-gallery {
        box-sizing: border-box; 
        width: 100%; 
        height: 100%; 
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-gap: 15px; 
        padding: 2rem 1.5rem; 
        .gallery-img {
            background-size: cover; 
            background-position: center;
            width: 100%;
            height: 180px; 
            cursor: pointer; 
            transition: transform .4s ease; 
            position: relative; 
            .check-circle {
                position: absolute; 
                top: -10px; 
                left: -10px; 
                font-size: 1.8rem;
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                background: rgb(255,171,0); 
                padding: .5rem; 
                .checkIcon {
                    color: white; 
                    border-radius: 50%; 
                }
            }
        }
        .selected {
            transform: scale(0.9); 
        }
        
    }
    .no-img-message {
        margin: auto; 
        transform: translateY(150px); 
        p {
            font-size: 1.6rem; 
        }
    }
    .gallery-p {
        font-size: 1.3rem;
        color: ${props => props.theme.gray};
        opacity: .8;
        padding: 1.5rem 1.5rem 0 1.5rem;
        margin: 0;
    }
    @media (max-width: 1100px) {
        .img-gallery {
            grid-template-columns: 1fr 1fr; 
            .gallery-img {
                height: 160px; 
            }
        }
    }
    @media (max-width: 600px) {
        .img-gallery { 
            .gallery-img {
                height: 120px; 
            }
        }
      
    }
    @media (max-width: 340px) {
        .img-gallery { 
            .gallery-img {
                height: 100px; 
            }
        }
    }
`; 

const StyledImgSelectedHeader = styled.div`
    position: sticky;
    width: 100%; 
    height: 60px;
    background: ${props => props.theme.pastelYellow};
    top: 0; 
    left: 0; 
    display: flex; 
    align-items: center;
    justify-content: space-between;
    z-index: 2; 

    .selected-count {
        font-size: 1.2rem; 
        font-weight: 500; 
        padding: 0 2rem; 
        margin: 0;
        color: rgba(0,0,0,0.87);
    }
    .iconButtonList {
        display: flex; 
        padding-right: 2rem; 
        align-items: center; 
    }
 
`; 
const StyledFaIcon = styled.button`
        border: none; 
        outline: none; 
        background: transparent; 
        font-size: 1.4rem; 
        cursor: pointer; 
        position: relative; 
        padding: .75rem;
        margin: 0 .75rem; 
        border-radius: 50%; 
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${props => props.selected ? "#6f6757" : "white"};
        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: -1px;
            pointer-events: none;
            background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
            background-repeat: no-repeat;
            background-position: 50%;
            transform: scale(9,9);
            opacity: 0;
            transition: transform .5s, opacity 1s;
        }
        &:active:after {
            transform: scale(0,0);
            opacity: .2;
            transition: 0s;
        }
     .tooltiptext {
            font-size: .9rem; 
            visibility: hidden;
            width: 120px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 6px 4px;
            position: absolute;
            z-index: 150;
            top: 125%;
            left: 100%;
            margin-left: -80px;
            opacity: 0;
            transition: opacity 0.3s;
    }
    .tooltiptext::after {
        content: " ";
        position: absolute;
        bottom: 100%;  
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #555 transparent;
    }
    &:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
    .px-2 {
        padding: 0 1rem; 
    }
`;
export { StyledGallery, StyledImgSelectedHeader, StyledFaIcon }; 