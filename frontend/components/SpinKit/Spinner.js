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

export { Spinner, ModalSpinner };