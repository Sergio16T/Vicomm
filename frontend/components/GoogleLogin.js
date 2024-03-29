import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GoogleLogin } from 'react-google-login';
import { googleID } from '../clientConfig';
import Router from 'next/router';
import styled from 'styled-components';
import { InfoAlert } from './Forms/Alerts';


const GOOGLE_LOGIN_MUTATION = gql`
    mutation GOOGLE_LOGIN_MUTATION($tokenId: String!) {
        googleSignIn(tokenId: $tokenId) {
            fst_nm,
            email
        }
    }
`;

const CLIENT_ID = googleID;
// const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

const GoogleContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 1rem 0;
	button {
		border: 1px solid #4285f4 !important;
		border-radius: 4px !important;
		background-color: #4285f4 !important;
		color: white !important;
		font-size: 1.4rem !important;
	}
`;

const GoogleBtn = (props) => {
    const [googleSignIn] = useMutation(GOOGLE_LOGIN_MUTATION, { refetchQueries: ["GET_USER_QUERY"] });
    const [state, setState] = useState({
        isLoggedIn: false,
        accessToken: '',
        email: '',
        infoAlert: '',
    });


    const login = async (response) => {
        console.log('response', response);
        if (!response.accessToken) {
            return;
        }
        setState({
            ...state,
            isLoggedIn: true,
            accessToken: response.accessToken,
            email: response.profileObj.email,
        });
        const googleSignInRes = await googleSignIn({ variables: { tokenId: response.tokenId } });
        console.log('res', googleSignInRes);
        if (props.signUp) {
            Router.push({
                pathname: "/dashboard",
            });
        }
    }

    const handleLoginFailure = (response) => {
        console.log('response details', response);
        if (response.error === 'popup_closed_by_user') {
            setState({
                ...state,
                infoAlert: response.error,
            });
            return;
        }

        props.setError({
            ...props.state,
            authError: response.details === 'R' ? ` Google sign in is unavailable: To continue authentication with google, enable third-party cookies in your browser. Otherwise sign in with your username and password.`: response.error,
        });
    }

    return (
        <div>
            {state.infoAlert &&
                <InfoAlert message="Google Pop Up Closed"/>
            }
            <GoogleContainer>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText={props.buttonText}
                    onSuccess={login}
                    onFailure={handleLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    responseType='code,token'
                />
            </GoogleContainer>
        </div>
    );
}

export default GoogleBtn;