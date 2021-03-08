import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form } from '../Styles/FormStyles';
import GoogleLogin from '../GoogleLogin';
import { SignInFormWrapper, SignInMessage } from '../Styles/SignInStyles';

const SIGN_IN_MUTATION = gql`
    mutation SIGN_IN_MUTATION($email: String! $password: String!) {
        signIn(email: $email, password: $password) {
            id,
            fst_nm,
            email
        }
    }
`;

const SignInForm = () => {
    const [signIn] = useMutation(SIGN_IN_MUTATION, { refetchQueries: ["GET_USER_QUERY"] });
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    }
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            await signIn({ variables: { ...state } });
        } catch(err) {
            console.log(err)
            setState({ ...state, signInError: err.message });
        }
    }
    return (
        <SignInFormWrapper>
            <SignInMessage>
                <h1>Hi, Welcome Back!</h1>
            </SignInMessage>
            {state.signInError &&
                <div className='error-message'>
                    <p>{state.signInError}</p>
                </div>
            }
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
                        required
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
                        required
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


export default SignInForm;