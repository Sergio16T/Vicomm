import { ThemeProvider, createGlobalStyle }  from 'styled-components'; 
import Meta from './Meta'; 

const theme = {
	black: '#393939',
    grey: '#3A3A3A',
    lightgray: '#E1E1E1',
    offWhite: '#EDEDED',
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

function Page(props) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Meta/>
            {props.children} 
        </ThemeProvider>
    );
}

export default Page;