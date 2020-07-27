import styled from 'styled-components'; 

const StyledHeader = styled.div`
    position:fixed; 
    background-color: white; 
    box-shadow: ${props => props.theme.bs}; 
    width: 100%; 
    height: 70px; 
    top: 0; 
    display: flex; 
    align-items: center;  
    z-index: 10; 
    img {
        margin: auto 0rem auto 4rem; 
        height: 50px;  
        &:hover {
            cursor: pointer;
        }
    }
    @media (max-width: 480px) {
        img {
            margin: auto 0rem auto 1rem; 
        }
    }
`; 

export default StyledHeader; 