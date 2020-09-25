import styled from 'styled-components'; 

const SignUpPage = styled.div`
    /* padding-top: 100px;  */
    /* height: 100%;  */
    background: rgba(0, 0, 0, 0.02);
    padding: 100px 0; 
    .OAuthLineBreak {
        padding: 1rem 0; 
        display: flex; 
        align-items: center; 
        .OAuthProvider_lineBreak {
        flex-grow: 1; 
        height: 2px; 
        background-color: #eee; 
        }
        #OAuth_or_text {
            font-size: 1.4rem; 
            margin: 0 1rem; 
        }
    }
`; 

const SignUpFormWrapper = styled.div`
    padding: 2rem; 
    border-radius: 6px; 
    background: white; 
    border: 1px solid #f5f5f5; 
    display: flex; 
    justify-content: center; 
    /* max-width: 800px; 
    width: 90%;  */
    position: relative; 
    width: 55%; 
    margin: 0 auto; 
    flex-direction: column; 
        .error-message {
            background-color: rgb(255, 0, 0, .1);
            border: 1px solid red; 
            border-left: 5px solid red;
            margin: .5rem 0; 
            padding: .5rem 1rem; 
            p {
                color: red; 
                font-size: 1.1rem; 
            }
        }
    @media (max-width: 900px) {
        width: 85%; 
    }
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