import React, { useEffect } from 'react';
import styled from 'styled-components';
import {  ModalBackDrop as BackDrop } from '../Styles/PageStyles';

const StyledError = styled.div`
    background-color: white;
    position: absolute;
    transform: translateX(-50%);
    top: 20%;
    left: 50%;
    background-size: contain;
    background-position: center;
    background-image: ${props => !props.image ? "linear-gradient(rgb(239 243 251), rgb(100 124 162 / 80%))" : `url(${props.image})`};
    min-width: 50vw;
    max-width: 90vw;
    box-sizing: border-box;
    height: 40vh;
    margin: 0 auto;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: ${props => props.error ? "1px solid red" : ""};
    z-index: 122;
    display: flex;
    flex-direction: column;
    .error-body {
        display: flex;
        flex-basis: 75%;
        justify-content: center;
        align-items: center;
    }
    .error-message-container {
        margin: 2rem 4rem 0 2rem;
        background-color: rgba(230, 54, 54, 1);
        border-radius: 6px;
        min-width: 200px;
        min-height: 100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
    #alert-icon {
        color: white;
        font-size: 1.4rem;
        margin-right: 1rem;
    }
    h2 {
        font-size: 1.3rem;
        color: white;
    }
    .error-footer {
        background: white;
        flex-basis: 25%;
        width: 100%;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
            background-color: #4285f4;
            width: 200px;
            box-sizing: border-box;
            border: 1px solid #4285f4;
            cursor: pointer;
            padding: 1rem;
            font-size: 1.1rem;
            color: white;
            border-radius: 6px;
        }
    }
    @media (max-width: 800px) and (min-width: 480px) {
        height: 310px;
        /* background-size: cover;  */
        width: calc(100%);
        border-radius: 0;
    }
    @media (max-width: 480px) {
        .error-container {
            margin: 80px 2rem 2rem 2rem;
            h2 {
                font-size: 1rem;
            }
        }
        width: calc(100% - 50px);
        height: 320px;
        background-size: cover;
    }

`;

const ErrorMessage = ({ error, reset }) => {

    useEffect(() => {
        if (error) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = '';
        }
    }, [error]);

    if (error) {
        return (
            <>
                <BackDrop isOpen={true}/>
                <StyledError
                    error
                    image="https://res.cloudinary.com/dddnhychw/image/upload/v1611182958/Web-Images/undraw_warning_cyit_arabdv.svg"
                >
                    <div className="error-body">
                        <div className="error-message-container">
                            <i className="fas fa-exclamation-triangle" id="alert-icon"></i>
                            <h2>{error.message}</h2>
                        </div>
                    </div>
                    <div className="error-footer">
                        <button onClick={reset}>Try Again</button>
                    </div>
                </StyledError>
            </>
        );
    }
    return null;
}

export default ErrorMessage;