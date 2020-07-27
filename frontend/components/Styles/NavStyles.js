import styled from 'styled-components'; 
import { Wobble } from './Animations'; 

const StyledNav = styled.ul`
    display: flex; 
    margin-left: auto; 
    padding: 0 3rem; 
    align-items: center; 
    li {
    padding: 0rem; 
    margin: 0 1rem; 
    font-size: 1.3rem; 
    font-family: 'Lato'; 
    list-style: none; 
    color: rgba(0,0,0,.7); 
        &:hover {
            cursor: pointer;
        }
        button {
            animation-name: ${Wobble}; 
            animation-delay: .25s; 
            animation-duration: 3s; 
            animation-timing-function: ease-in-out; 
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
        li {
            margin: auto 1rem auto 0; 
            button {
                padding: .65rem .98rem; 
            }
        }
    }
`; 


export default StyledNav; 