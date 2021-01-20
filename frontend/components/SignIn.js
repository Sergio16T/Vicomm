import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { Form } from './Styles/FormStyles';
import GoogleLogin from './GoogleLogin';
import { SignInPage, SignInFormWrapper, SignInMessage } from './Styles/SignInStyles';
import { GET_USER_QUERY } from './PageProvider';
import Router from 'next/router';

const SIGN_IN_MUTATION = gql`
    mutation SIGN_IN_MUTATION($email: String! $password: String!) {
        signIn(email: $email, password: $password) {
            id,
            fst_nm,
            email
        }
    }
`;

const SignIn = (props) => {
    const { loading, data } = useQuery(GET_USER_QUERY);

    if (loading) return null;
    if (data.user) {
        Router.push({
            pathname: "/dashboard"
        });
        return null;
    }
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
    const [signIn] = useMutation(SIGN_IN_MUTATION, {refetchQueries: ["GET_USER_QUERY"]});
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
        try {
            await signIn({ variables: {...state}}).catch(err=> {
                throw err;
            });
        } catch(err) {
            console.log(err)
            setState({...state, signInError: err.message });
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

export default SignIn;