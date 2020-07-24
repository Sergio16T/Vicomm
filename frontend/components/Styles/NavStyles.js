import styled from 'styled-components'; 

const StyledNav = styled.ul`
    display: flex; 
    margin-left: auto; 
    padding: 0 3rem; 
    align-items: center; 
    li {
    padding: 0rem; 
    margin: 0 1rem; 
    font-size: 1.4rem; 
    list-style: none; 
    color: rgba(0,0,0,.7); 
        &:hover {
            cursor: pointer;
        }
        button {
            font-size: 1.4rem; 
            padding: .65rem 2.5rem;
            background-color: #3BD2A2;  
            border: none; 
            outline: none; 
            border-radius: 6px; 
            color: white; 
            &:hover {
                cursor: pointer;
            }
        }
    }      
    @media (max-width: 480px) {
        padding: 0 1rem; 
    }
`; 

export default StyledNav; 