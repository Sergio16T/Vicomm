import styled from 'styled-components'; 

const HorizontalScrollGallery = styled.div`
   position: relative; 
   width: 100%; 
   height: 280px; 
   margin: 1rem auto;
   box-sizing: border-box; 
   z-index: 1;
    .gallery {
        display: flex; 
        flex-wrap: nowrap; 
        width: 100%; 
        box-shadow: ${props => props.theme.bs};
        height: 280px; 
        padding: 1rem 0;
        border-radius: 4px;
        box-sizing: border-box; 
        overflow-x: auto;
        .card-container {
            flex-basis: auto;
            height: 100%;
            width: ${props => props.onlyCard ? "100%" : "340px"}; 
            padding: 0 .5rem;
            position: relative;
            &:hover {
                cursor: pointer; 
                .image_manager {
                visibility: visible;
                }
            }
        }
        .card-container:first-of-type {
            padding-left: 1rem; 
        }
        .card-container:last-of-type {
           padding-right: 1rem; 
        }
        .image_manager {
            position: absolute;
            background: rgba(255,171,0,0.75);
            padding: .25rem; 
            width: ${props => props.onlyCard ? "calc(100% - 2rem)" : "340px"}; 
            bottom: -8px;
            left: calc(0 + .5rem);
            box-sizing: border-box;
            display: flex; 
            justify-content: space-between;
            align-items: center;
            visibility: hidden; 
        }
        .manager_icon {
            color :white; 
            font-size: 1.4rem; 
            padding: 0 .5rem;
            opacity: .6;
            cursor: pointer; 
        }
        .invisible {
        visibility: hidden;
        }
        .span-x {
        font-size: 2.4rem; 
        opacity: .6; 
        color: white; 
        z-index: 4; 
        cursor: pointer; 
            &:hover {
                cursor: pointer;
            }
        }
        .card {
            height: 100%;
            min-width: ${props => props.onlyCard ? "100%" : "340px"}; 
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
            z-index: 2;
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
    .invisible {
        .tooltiptext {
            display: none; 
        }
    }
    .tooltiptext {
            font-size: .9rem; 
            visibility: hidden;
            width: 80px;
            background-color: #6f6e6e;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: .75rem 1rem;
            position: absolute;
            z-index: 150;
            top: -150%;
            left: 50%;
            margin-left: -55px;
            transform: scale(0); 
            transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1); 
    }
    .tooltiptext::after {
        content: " ";
        position: absolute;
        top: 100%;  
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #6f6e6e transparent transparent transparent;
    }
    .rp-button {
        min-height: 35px;
        &:hover {
            .tooltiptext {
                visibility: visible;
                transform: scale(1);
            }
            .manager_icon, .span-x {
                opacity: 1;
            }
        }
    }
    @media (max-width: 480px) {
        height: 240px; 
        .gallery {
            height: 240px;
            .card-container, .image_manager, .card {
                width: ${props => props.onlyCard ? "calc(100% - 2rem)" : "280px"}; 
            }
            .card {
                min-width: 280px;
            }
            .image_manager {
                visibility: visible;
            }
        }
    }
`; 

export default HorizontalScrollGallery; 