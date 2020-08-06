import styled from 'styled-components'; 

const SignInPage = styled.div`
#logo {
    position: absolute; 
    top: 20px; 
    left: 50px; 
    height: 60px; 
    &:hover {
        cursor: pointer; 
    }
}
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
@media (max-width: 480px) {
   #logo {
       left: 30px; 
   }
}
`; 

const SignInFormWrapper = styled.div`
padding-top: 150px; 
width: 45%; 
margin: 0 auto; 
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

const SignInMessage = styled.div`
margin: auto; 
padding: .5rem 0; 
text-align: center; 
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

export { SignInPage, SignInFormWrapper, SignInMessage }; 