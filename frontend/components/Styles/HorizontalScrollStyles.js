import styled from 'styled-components'; 

const HorizontalScrollGallery = styled.div`
   position: relative; 
   width: 100%; 
   height: 310px; 
   margin: 1rem auto;
   box-sizing: border-box; 
    .gallery {
        display: flex; 
        flex-wrap: nowrap; 
        width: 100%; 
        box-shadow: ${props => props.theme.bs};
        height: 310px; 
        padding: 1rem 0; 
        border-radius: 6px;
        box-sizing: border-box; 
        overflow-x: auto;
        .card-container {
            flex-basis: auto;
            height: 100%;
            width: ${props => props.onlyCard ? "100%" : "400px"}; 
            padding: 0 .5rem;
        }
        .card-container:first-of-type {
            padding-left: 1rem; 
        }
        .card-container:last-of-type {
           padding-right: 1rem; 
        }
        .card {
            height: 100%;
            min-width: ${props => props.onlyCard ? "100%" : "400px"}; 
            background-size: cover; 
            background-position: center; 
            overflow: hidden;
        }
        &:hover {
            .arrow-left, .arrow-right {
                opacity: 1; 
                visibility: visible; 
            }
        }
        .arrow-left, .arrow-right {
            visibility: hidden; 
            opacity: 0;
            position: absolute; 
            font-size: 2rem; 
            background-color: #fffdfd;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26); 
            color: black; 
            height: 40px; 
            width: 40px; 
            display: flex; 
            z-index: 10;
            cursor: pointer; 
            transition: all .3s ease-in; 
            .icon {
                margin: auto; 
            }
        }
        .arrow-left {
            top: 50%; 
            left: 10px;
            border-radius: 50%; 
        
        }
        .arrow-right {
            top: 50%; 
            right: 10px;
            border-radius: 50%; 

        }
        .d-none {
            display: none; 
        }
    }
 
`; 

export default HorizontalScrollGallery; 