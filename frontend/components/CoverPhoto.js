import React from 'react';
import styled from 'styled-components';

const StyledCoverPhoto = styled.div`
    background-size: contain;
    background-position: center;
    background-image: ${props => !props.image ? "linear-gradient(rgb(239 243 251), rgb(100 124 162 / 80%))" : `url(${props.image})`};
    width: calc(100% - 80px);
    height: 220px;
    margin: 0 auto;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: ${props => props.error ? "1px solid red" : ""};
    border-top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .error-container {
        margin: 4rem;
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
        height: 260px;
        background-size: cover;
    }

`;
const CoverPhoto = ({ loading, data, error }) => {
    if (error) return (
        <StyledCoverPhoto
            error
            image="https://res.cloudinary.com/dddnhychw/image/upload/v1611182958/Web-Images/undraw_warning_cyit_arabdv.svg"
        >
            <div className="error-container">
                <i className="fas fa-exclamation-triangle" id="alert-icon"></i>
                <h2>{error.message}</h2>
            </div>
        </StyledCoverPhoto>
    );
    return (
        <StyledCoverPhoto
            image={loading ? "" : data.getCoverPhoto ? data.getCoverPhoto.mltmd_lg_url : ""}
        />
    );
}

export default CoverPhoto;