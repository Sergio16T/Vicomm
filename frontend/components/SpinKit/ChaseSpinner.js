import React from 'react';
import styled from 'styled-components';

const StyledChaseSpinner = styled.div`
    position: fixed;
    width: 70vw;
    max-width: 800px;
    overflow-y: scroll;
    overflow-x: hidden;
    min-height: ${props => props.minHeight};;
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
        min-height: ${props => props.minHeight};;
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
        <StyledChaseSpinner
            spinner={props.spinner}
            show={props.show}
            minHeight={props.minHeight}
        >
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
    );
}
export default ChaseSpinner