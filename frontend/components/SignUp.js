import React, { useState } from 'react'; 
import { useMutation, gql } from '@apollo/client'; 
import Router from 'next/router'; 
import Header from './Header'; 
import { Body, Form} from './Styles/FormStyles'; 
import { SignUpPage, SignUpMessage, SignUpFormWrapper } from './Styles/SignUpStyles'; 
import GoogleLogin from './GoogleLogin'; 

const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
        signUp(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
            ACCT_KEY,
            FST_NAME, 
            EMAIL
        }
    }
`

const SignUp = (props) => {
    return (
        <SignUpPage>
            <Header/>
            <Body>
                <SignUpMessage>
                    <h1>Get Started Today!</h1>
                </SignUpMessage>
                <SignUpForm/>
            </Body>
        </SignUpPage>
    )
}



const SignUpForm = (props) => {
    const [ signUp, { data }] = useMutation(SIGN_UP_MUTATION); 
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        emailError: ''
    }); 

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        switch(name){
            case "email":
                if(state.emailError && emailRegEx.test(value)) {
                    setState({...state, [name]: value, emailError: '' }); 
                } else {
                    setState({...state, [name]: value }); 
                } 
                break; 
            case "confirmPassword": 
                if(state.passwordError && value === state.password) setState({...state, [name]: value, passwordError: '' }); 
                else setState({...state, [name]: value }); 
                break; 
            case "password" :
                if(state.passwordError && value === state.confirmPassword) setState({ ...state, [name]: value, passwordError: ''}); 
                else setState({...state, [name]: value }); 
                break; 
            default:
                setState({
                    ...state, 
                    [name]: value
                }); 
        }
    }
    const submitForm = async (e) => {
        e.preventDefault(); 
        if(!state.passwordsMatch) return; 
        try {
            await signUp({variables: {...state} }).catch(err => {
                throw err; 
            }); 
            Router.push({
                pathname: "/dashboard"
            });
        } catch(err) {
            setState({...state, signUpError: err.message }); 
        }
    }
    const confirmPasswordMatch = () => {
        const { password, confirmPassword } = state; 
        const match = password === confirmPassword ? true : false; 
        const passwordError = match ? '' : 'Passwords do not match'
        setState({...state, passwordsMatch: match, passwordError }); 
    }
    const handleBlur = (e) => {
        const { name, value } = e.target; 
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        switch(name) {
            case 'email':
                if(!emailRegEx.test(value.trim())) setState({ ...state, emailError: "Please enter a valid email"}); 
                break; 
            case 'confirmPassword': 
                if(state.password) confirmPasswordMatch(); 
                break; 
            case 'password': 
                if(state.confirmPassword) confirmPasswordMatch(); 
            break; 
        }
   
    }
    return (
        <SignUpFormWrapper>
               {state.signUpError && 
                    <div className='error-message'>
                        <p>{state.signUpError}</p>
                    </div>
                }
            <Form onSubmit={submitForm}>
                <div className="formRow">
                    <label htmlFor="firstName">
                        First Name
                    </label>
                    <input
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                    value={state.firstName}
                    required
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="firstName">
                        Last Name
                    </label>
                    <input
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                    value={state.lastName}
                    required
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="firstName">
                        Email
                    </label>
                    <input
                    type="text"
                    name="email"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={state.email}
                    required
                    />
                    {state.emailError && <p className="error">{state.emailError}</p>}
                </div>
                <div className="formRow">
                    <label htmlFor="firstName">
                        Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={state.password}
                    required
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="firstName">
                        Confirm Password
                    </label>
                    <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    value={state.confirmPassword}
                    required
                    />
                    {state.passwordError && <p className="error">{state.passwordError}</p>}
                </div>
                <div className="form-button-row">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="OAuthLineBreak">
                    <span className="OAuthProvider_lineBreak"></span>
                    <span id="OAuth_or_text">or </span>
                <span className="OAuthProvider_lineBreak"></span>
                </div>
                <GoogleLogin buttonText="Sign Up with Google"/>
            </Form>
        </SignUpFormWrapper>
    )
}

export default SignUp;