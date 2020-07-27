import styled from 'styled-components'; 

const SignUpPage = styled.div`
    /* padding-top: 100px;  */
    height: 100%; 
    background: rgba(0, 0, 0, 0.02);
    padding: 100px 0; 
`; 

const SignUpFormWrapper = styled.div`
    padding: 2rem; 
    border-radius: 6px; 
    background: white; 
    border: 1px solid #f5f5f5; 
    display: flex; 
    justify-content: center; 
    max-width: 800px; 
    width: 90%; 
    position: relative; 
`; 

const SignUpMessage = styled.div`
    margin: auto; 
    padding: 3rem 0; 
    h1 {
        font-size: 4rem; 
        font-weight: 600; 
        margin: auto; 
        margin-bottom: 1rem; 
    }
    @media (max-width: 700px) {
        h1 {
            font-size: 3rem; 
        }
    }
    @media (max-width: 380px) {
        h1 {
            font-size: 2.6rem; 
        }
    }
`; 

export { SignUpPage, SignUpFormWrapper, SignUpMessage }; 