import styled from 'styled-components'; 

const StyledModal = styled.div`
    position: fixed; 
    width: 60vw; 
    max-width: 700px; 
    overflow-y: scroll; 
    overflow-x: hidden; 
    min-height: 500px; 
    margin: auto;
    top: 100px; 
    left: 0; 
    right: 0; 
    transform: ${props => props.show ? "translate(0, 0%)" : "translate(0, -100%)"};
    opacity: ${props => props.show ? 1 : 0};
    visibility: ${props => props.show ? "visible" : "hidden"}; 
    box-shadow: ${props => props.theme.bs}; 
    background: ${props => `linear-gradient(to Bottom, transparent 60px, white 0%)`}; 
    transition: .4s ease; 
    z-index: 121; 
    border-radius: 6px; 
    display: flex; 
    flex-direction: column; 
    .modal-content {
        position: absolute; 
        padding-top: 60px; 
        width: 100%; 
        border-bottom-right-radius: 6px; 
        border-bottom-left-radius: 6px; 
    }
    .modal-header {
        position: sticky;
        width: 100%; 
        height: 60px;
        background: ${props => props.theme.skyBlue};
        top: 0; 
        left: 0; 
        display: flex; 
        align-items: center;
        justify-content: space-between;
        z-index: 2; 
        h2 {
            font-size: 1.4rem; 
            text-transform: uppercase; 
            font-weight: 500; 
            padding: 0 1rem; 
            padding-left: 2rem;
            margin: 0;
            color:white;
        }
    }
    #uploadImgBtn {
        outline: none; 
        border: none;
        border-radius: 6px; 
        background: rgb(255,171,0); 
        padding: .8rem;
        color: white; 
        font-size: 1.3rem; 
        margin-right: 30px; 
        cursor: pointer;
    }
    .plusIcon {
            padding-right: .5rem;
    }
    .d-flex {
        display: flex; 
    }
    #uploadImg {
        position: absolute;
        border: 0;
        height: 1px;
        width: 1px;
        white-space: nowrap;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
    }
    .modal-x {
        margin-right: 20px; 
        font-size: 2.4rem; 
        opacity: .6; 
        color: ${props => props.modalXColor}; 
        z-index: 4; 
        &:hover {
            cursor: pointer;
            opacity: 1; 
        }
    }
    .modal-body {
        width: 100%; 
        height: 100%; 
    }
    @media (max-width: 800px) {
        width: 90vw; 
    }
    @media (max-width: 600px) {
        #uploadImgBtn {
            padding: .8rem 1rem; 
        }
        .plusIcon {
            font-size: 1.5rem;
            padding-right: 0;
        }
    }
    @media (max-width: 380px) {
        min-height: 70vh; 
    }
`; 

export { StyledModal }; 