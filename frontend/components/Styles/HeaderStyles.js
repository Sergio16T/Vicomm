import styled from 'styled-components';

const StyledHeader = styled.div`
    position:fixed;
    background-color: ${props => props.scrollPosition >= 1 ? "white": "transparent"};
    box-shadow: ${props => props.scrollPosition >= 1 ? props.theme.bs : "none"};
    width: 100%;
    height: 80px;
    top: 0;
    display: flex;
    align-items: center;
    z-index: 10;
    transition: .2s ease-in;
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