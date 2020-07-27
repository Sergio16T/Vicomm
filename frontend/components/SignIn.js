import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'; 
import Link from 'next/link'; 
import { Form } from './Styles/FormStyles'; 
import GoogleLogin from './GoogleLogin'; 
import styled from 'styled-components'; 
import Router from 'next/router'; 

const SIGN_IN_MUTATION = gql`
    mutation SIGN_IN_MUTATION($email: String! $password: String!) {
        signIn(email: $email, password: $password) {
            ACCT_KEY, 
            FST_NAME,
            EMAIL
        }
    }
`; 

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
const SignIn = (props) => {
    return (
        <SignInPage>
            <Link href="/">
                <img id="logo" src="https://res.cloudinary.com/dddnhychw/image/upload/v1595569683/Full%20Stack%20App/Logo_W__Title_4_evli4d.svg"/>
            </Link>
            <SignInForm/>
       
        </SignInPage>
    ); 
}
const SignInForm = () => {
    const [signIn, { data }] = useMutation(SIGN_IN_MUTATION); 
    const [state, setState] = useState({
        email: '',
        password: ''
    }); 
    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setState({
            ...state, 
            [name]: value
        }); 
    }
    const submitForm = async (e) => {
        e.preventDefault(); 
        await signIn({ variable: {...state}}); 
        Router.push({
            pathname: '/dashboard'
        }); 
    } 
    return (
        <SignInFormWrapper>
              <SignInMessage>
                <h1>Hi, Welcome Back!</h1>
              </SignInMessage>
            <Form onSubmit={submitForm}>
                <div className="formRow">
                    <label htmlFor="firstName">
                        Email
                    </label>
                    <input
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                    value={state.email}
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="firstName">
                        Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={state.password}
                    />
                </div>
                <div className="form-button-row">
                    <button type="submit">Sign In</button>
                </div>
            </Form>
            <div className="OAuthLineBreak">
                <span className="OAuthProvider_lineBreak"></span>
                <span id="OAuth_or_text">or </span>
                <span className="OAuthProvider_lineBreak"></span>
            </div>
            <GoogleLogin buttonText="Sign in with Google"/>
        </SignInFormWrapper>
    );
};

export default SignIn;