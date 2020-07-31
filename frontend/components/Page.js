import { ThemeProvider }  from 'styled-components'; 
import Meta from './Meta'; 
import { theme, GlobalStyle } from './Styles/PageStyles'; 


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