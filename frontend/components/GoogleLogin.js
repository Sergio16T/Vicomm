import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { googleID } from '../clientConfig';
import Router from 'next/router';
import styled from 'styled-components';


const GOOGLE_LOGIN_MUTATION = gql`
    mutation GOOGLE_LOGIN_MUTATION($firstName: String!, $lastName: String!, $email: String!, $accessToken: String!) {
        googleSignIn(firstName: $firstName, lastName: $lastName, email: $email, accessToken: $accessToken) {
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
	const [googleSignIn] = useMutation(GOOGLE_LOGIN_MUTATION, {refetchQueries: ["GET_USER_QUERY"]});
    const [state, setState] = useState({
        isLoggedIn: false,
        accessToken: '',
        email: ''
    });


	const login = async (response) => {
		console.log('response', response);
		if (!response.accessToken) return;
		setState({
			...state,
			isLoggedIn: true,
			accessToken: response.accessToken,
			email: response.profileObj.email
		});
		const googleSignInRes = await googleSignIn({variables: {
			accessToken: response.accessToken,
			email: response.profileObj.email,
			firstName: response.profileObj.givenName,
			lastName: response.profileObj.familyName
		}});
		console.log('res', googleSignInRes);
		if (props.signUp) {
			Router.push({
				pathname: "/dashboard"
			});
		}
	}

	const logout = (response) => {
		console.log(response);
		setState({
		...state,
		isLoggedIn: false,
		accessToken: ''
		});
	}

	const handleLoginFailure = (response) => {
		console.log(response);
	}

	const handleLogoutFailure =  (response) => {
		console.log(response);
	}
    return (
		<div>
			{state.isLoggedIn ?
				<GoogleContainer>
					<GoogleLogout
						clientId={CLIENT_ID}
						buttonText='Logout'
						onLogoutSuccess={logout}
						onFailure={handleLogoutFailure}
					/>
				</GoogleContainer>
				:

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
			}
		</div>
    );
}

export default GoogleBtn;