import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import { Form } from '../Styles/FormStyles';
import { SignUpFormWrapper } from '../Styles/SignUpStyles';
import GoogleLogin from '../GoogleLogin';

const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
        signUp(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
            id,
            fst_nm,
            email
        }
    }
`;

const SignUpForm = () => {
    const [signUp] = useMutation(SIGN_UP_MUTATION);
    const [state, setState] = useState({
        authError: '',
        confirmPassword: '',
        email: '',
        emailError: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordError: '',
        passwordsMatch: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const {
            confirmPassword,
            emailError,
            passwordError,
            password,
        } = state;
        const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        switch (name) {
            case "email":
                if (emailError && emailRegEx.test(value)) {
                    setState({
                        ...state,
                        [name]: value,
                        emailError: '',
                    });
                } else {
                    setState({
                        ...state,
                        [name]: value,
                    });
                }
                break;
            case "confirmPassword":
                if (passwordError && value === password) {
                    setState({
                        ...state,
                        [name]: value,
                        passwordError: '',
                    });
                } else {
                    setState({
                        ...state,
                        [name]: value,
                    });
                }
                break;
            case "password" :
                if (passwordError && value === confirmPassword) {
                    setState({
                        ...state,
                        [name]: value,
                        passwordError: '',
                    });
                } else {
                    setState({
                        ...state,
                        [name]: value,
                    });
                }
                break;
            default:
                setState({
                    ...state,
                    [name]: value,
                });
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (!state.passwordsMatch) { return; }

        try {
            await signUp({ variables: { ...state } });
            Router.push({
                pathname: "/dashboard",
            });
        } catch (err) {
            setState({
                ...state,
                authError: err.message,
            });
        }
    }

    const confirmPasswordMatch = () => {
        const {
            confirmPassword,
            password,
        } = state;
        let passwordsMatch = password === confirmPassword;

        setState({
            ...state,
            passwordsMatch,
            passwordError: passwordsMatch ? '' : 'Passwords do not match',
        });
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        switch (name) {
            case 'email':
                if (!emailRegEx.test(value.trim())) {
                    setState({
                        ...state,
                        emailError: "Please enter a valid email",
                    });
                }
                break;
            case 'confirmPassword':
                if (state.password) {
                    confirmPasswordMatch();
                }
                break;
            case 'password':
                if (state.confirmPassword) {
                    confirmPasswordMatch();
                }
                break;
            default:
                throw new Error(`Unrecognized input name: ${name}`);
        }
    }

    const {
        authError,
        confirmPassword,
        email,
        emailError,
        firstName,
        lastName,
        password,
        passwordError,
    } = state;
    return (
        <SignUpFormWrapper>
            {authError &&
                <div className="error-message">
                    <p>{authError}</p>
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
                        value={firstName}
                        required
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        onChange={handleInputChange}
                        value={lastName}
                        required
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={email}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>
                <div className="formRow">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={password}
                        required
                    />
                </div>
                <div className="formRow">
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        value={confirmPassword}
                        required
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>
                <div className="form-button-row">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="OAuthLineBreak">
                    <span className="OAuthProvider_lineBreak"></span>
                    <span id="OAuth_or_text">or </span>
                    <span className="OAuthProvider_lineBreak"></span>
                </div>
                <GoogleLogin
                    buttonText="Sign Up with Google"
                    setError={setState}
                    signUp
                    state={state}
                />
            </Form>
        </SignUpFormWrapper>
    );
}

export default SignUpForm;