import React from 'react';
import Header from './Layout/Header';
import SignUpForm from './Forms/SignUpForm';
import { Body } from './Styles/FormStyles';
import { SignUpPage, SignUpMessage } from './Styles/SignUpStyles';

const SignUp = () => {
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
    );
}

export default SignUp;