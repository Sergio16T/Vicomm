import React, { useState } from 'react'; 
import { useMutation, gql } from '@apollo/client'; 
import Router from 'next/router'; 
import Header from './Header'; 
import { Body, Form} from './Styles/FormStyles'; 
import { SignUpPage, SignUpMessage, SignUpFormWrapper } from './Styles/SignUpStyles'; 

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
    const [ signUp, {data}] = useMutation(SIGN_UP_MUTATION); 
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        console.log('sign up!')
        await signUp({variables: {...state} }); 
        Router.push({
            pathname: "/dashboard"
        });
    }
    return (
        <SignUpFormWrapper>
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
                <div className="formRow">
                    <label htmlFor="firstName">
                        Confirm Password
                    </label>
                    <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    value={state.confirmPassword}
                    />
                </div>
                <div className="form-button-row">
                    <button type="submit">Sign Up</button>
                </div>
            </Form>
        </SignUpFormWrapper>
    )
}

export default SignUp;