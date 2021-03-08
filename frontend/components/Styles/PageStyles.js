import styled, { createGlobalStyle }  from 'styled-components';

const theme = {
    black: '#393939',
    gray: '#3A3A3A',
    lightgray: '#E1E1E1',
    offWhite: '#fffdfd',
    maxWidth: '1000px',
    bs: '1px 1px 4px 1px rgba(51,51,51,.2)', //shorthand for box shadow
    blue: "rgba(10,10,54,1)",
    skyBlue:  "#4285f4",
    purple: "#5f2ee9",
    pink: "#EB3569",
    pastelYellow: "#f1e0be",
}

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-size: 12px;
		height: 100%;
        min-height: 100vh;
	}
	body {
		margin: 0;
		padding: 0;
		font-family: "Lato";
		height: 100%;
        min-height: 100vh;
	}
	 div#__next {
        height: 100%;
        min-height: 100vh;
      }
	a {
		text-decoration: none;
		color: black;
	}
    .rp-button {
        outline: none;
        border:none;
        background-color: transparent;
        position: relative;
        &:disabled {
            pointer-events: none;
            opacity: .6;
        }
    }
`;

const BackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000000;
    opacity: ${props => props.isOpen ? .5 : 0};
    display: ${props => props.isOpen ? "block" : "none"};
    z-index: 99;
    transition: all 0.4s cubic-bezier(0.46, 0.01, 0.32, 1);
`;
const ModalBackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000000;
    opacity: ${props => props.isOpen ? .5 : 0};
    display: ${props => props.isOpen ? "block" : "none"};
    z-index: 120;
    transition: all 0.8s cubic-bezier(0.46, 0.01, 0.32, 1);
`;

const StyledPage = styled.div`
    width: 100%;
    min-height: 100%;
    position: relative;
`;

export { theme, GlobalStyle, BackDrop, ModalBackDrop, StyledPage }