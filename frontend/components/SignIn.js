import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SignInPage} from './Styles/SignInStyles';
import { GET_USER_QUERY } from './Layout/PageProvider';
import SignInForm from './Forms/SignInForm';
import Router from 'next/router';

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

export default SignIn;