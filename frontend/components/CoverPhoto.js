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
    @media (max-width: 800px) and (min-width: 480px) {
        height: 310px;
        /* background-size: cover;  */
        width: calc(100%); 
        border-radius: 0; 
    }
    @media (max-width: 480px) {
        width: calc(100% - 50px); 
        height: 260px;
        background-size: cover; 
    }

`;   
const CoverPhoto = ({ loading, data }) => {
    return (
        <StyledCoverPhoto
        image={loading ? "" : data.getCoverPhoto ? data.getCoverPhoto.MLTMD_LG_URL : ""}
        />
    ); 
}

export default CoverPhoto;