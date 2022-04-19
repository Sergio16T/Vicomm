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
        font-size: 1.4rem;
        font-family: 'Lato';
        list-style: none;
        color: rgba(0, 0, 0, .6);
        &:hover {
            cursor: pointer;
        }
        button {
            text-transform: uppercase;
            animation-name: ${Wobble};
            animation-delay: .25s;
            animation-duration: 3s;
            animation-timing-function: ease-in-out;
            font-size: 1.2rem;
            padding: 1rem 2.2rem;
            /* background-color: #3BD2A2; */
            background-color: ${props => props.theme.skyBlue};
            border: none;
            outline: none;
            border-radius: 6px;
            color: white;
            &:hover {
                cursor: pointer;
            }
        }
    }
    @media (max-width: 600px) {
        li {
            button {
                font-size: 1.1rem;
            }
        }
    }
    @media (max-width: 480px) {
        padding: 0 .5rem;
        li {
            margin: auto 1rem auto 0;
            font-size: 1.2rem;
            button {
                padding: .85rem 1rem;
            }
        }
    }
`;


export default StyledNav;