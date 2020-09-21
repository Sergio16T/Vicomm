import React from 'react'; 
import styled from 'styled-components'; 

const StyledSpinner = styled.div`
    display: ${props => props.spinner ? "block" : "none"}; 
    #backDrop {
        background: rgba(0,0,0, 0.3);
        position: absolute; 
        height: 100%; 
        width: 100%; 
        top: 0; 
        left: 0;
        right: 0; 
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3; 
    }
    #loading {
      display: inline-block;
      width: 60px;
      height: 60px;
      border: 3px solid rgba(255,255,255,.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s infinite linear;
      -webkit-animation: spin 1s infinite linear;
      z-index: 2; 
}

@keyframes spin {
    from {
      -webkit-transform: rotate(0deg); 
    }
    to { 
      -webkit-transform: rotate(360deg); 
    }
}
`; 

const Spinner = (props) => {
    return (
        <StyledSpinner spinner={props.spinner}>
            <div id="backDrop">
                <div id="loading"></div>
            </div>
        </StyledSpinner>
      
    )
}


const StyledModalSpinner = styled.div`
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
    visibility: ${props => props.spinner && props.show ? "visible" : "hidden"}; 
    transition: .4s ease; 
    z-index: 121; 
    border-radius: 6px; 
    display: flex; 
    flex-direction: column; 
    #backDrop {
        background: rgba(255, 255, 255, 0.6);
        height: 100%; 
        width: 100%; 
        top: 0; 
        left: 0;
        right: 0; 
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3; 
        min-height: 500px; 
    }
    #loading {
      display: inline-block;
      width: 45px;
      height: 45px;
      border: 6px solid rgba(255,255,255,.5);
      border-radius: 50%;
      /* border-top-color: #fff; */
      /* border-top-color: rgba(0,0,0,0.4); */
      border-top-color: rgba(85, 85, 85, .8); 
      /* border-right-color: rgba(0, 0, 0, 0.4); */
      border-right-color: rgba(85, 85, 85, .8); 
      animation: spin 1.1s infinite linear;
      -webkit-animation: spin 1.1s infinite linear;
      z-index: 2; 
    }
    @media (max-width: 800px) {
        width: 90vw; 
    }
    @media (max-width: 340px) {
        min-height: 400px; 
        #backDrop {
            min-height: 400px; 
        }
    }
    @keyframes spin {
    from {
      -webkit-transform: rotate(0deg); 
    }
    to { 
      -webkit-transform: rotate(360deg); 
    }
 
}
`; 
const ModalSpinner = (props) => {
    return (
        <StyledModalSpinner spinner={props.spinner} show={props.show}>
            <div id="backDrop">
                <div id="loading"></div>
            </div>
        </StyledModalSpinner>
      
    )
}


const StyledChaseSpinner = styled.div`
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
    visibility: ${props => props.spinner && props.show ? "visible" : "hidden"}; 
    transition: .4s ease; 
    z-index: 121; 
    border-radius: 6px; 
    display: flex; 
    flex-direction: column; 
    #backDrop {
        background: rgba(255, 255, 255, 0.6);
        height: 100%; 
        width: 100%; 
        top: 0; 
        left: 0;
        right: 0; 
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3; 
        min-height: 500px; 
    }
    .sk-chase {
        width: 50px;
        height: 50px;
        position: relative;
        animation: sk-chase 2.5s infinite linear both;
    }

    .sk-chase-dot {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0; 
        animation: sk-chase-dot 2.0s infinite ease-in-out both; 
    }

    .sk-chase-dot:before {
        content: '';
        display: block;
        width: 35%;
        height: 35%;
        background-color: rgba(85, 85, 85, .8);
        border-radius: 100%;
        animation: sk-chase-dot-before 2.0s infinite ease-in-out both; 
    }

    .sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
    .sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
    .sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
    .sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
    .sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
    .sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
    .sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
    .sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
    .sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
    .sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
    .sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
    .sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }
    @media (max-width: 800px) {
        width: 90vw; 
    }
    @media (max-width: 380px) {
        min-height: 70vh; 
        #backDrop {
            min-height: 70vh; 
        }
    }
    @keyframes sk-chase {
        100% { transform: rotate(360deg); } 
    }

    @keyframes sk-chase-dot {
        80%, 100% { transform: rotate(360deg); } 
    }

    @keyframes sk-chase-dot-before {
        50% {
            transform: scale(0.4); 
        } 100%, 0% {
            transform: scale(1.0); 
        } 
    }
`; 

const ChaseSpinner = (props) => {
    return (
        <StyledChaseSpinner spinner={props.spinner} show={props.show}>
            <div id="backDrop">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        </StyledChaseSpinner>
    )
}
export default ChaseSpinner
export { Spinner, ModalSpinner}; 