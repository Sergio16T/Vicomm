import styled, { createGlobalStyle }  from 'styled-components'; 

const theme = {
	black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#fffdfd',
	maxWidth: '1000px',
	bs: '1px 1px 4px 1px rgba(51,51,51,.2)', //shorthand for box shadow 
	blue: "rgba(10,10,54,1)", 
	purple: "#2b3eab" 
}

const GlobalStyle = createGlobalStyle`	
	html {
		box-sizing: border-box; 
		font-size: 12px; 
		height: 100%; 
	}
	body {
		margin: 0; 
		padding: 0; 
		font-family: "Lato"; 
		/* height: 100%;  */
	}
	 div#__next {
        height: 100%;
      }
	a {
		text-decoration: none; 
		color: black; 
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

export { theme, GlobalStyle, BackDrop}