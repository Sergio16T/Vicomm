import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router';
import WithApollo from '../../lib/ApolloClient';
import { ThemeProvider }  from 'styled-components';
import Meta from './Meta';
import SideBar  from './AppSidebar';
import { theme, GlobalStyle } from '../Styles/PageStyles';
import usePrevious from '../../lib/Hooks/usePrevious';
import smoothscroll from 'smoothscroll-polyfill';
import Error from '../Modal/Error';

const GET_USER_QUERY = gql`
    query GET_USER_QUERY {
        user {
            fst_nm,
            lst_nm
        }
    }
`;

const Context = React.createContext();

function PageProvider({ children, pathname }) {
    const { client, loading: userLoading, error, data: userData } = useQuery(GET_USER_QUERY, {
        errorPolicy: 'all', // `all` - Both data and error.graphQLErrors are populated, enabling you to render both partial results and error information.
    });
    const [isOpen, setIsOpen ] = useState(false);
    const previousPath = usePrevious(pathname);
    const context = {
        isOpen,
        setIsOpen,
        client,
        userData,
    };

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    useEffect(() => {
        if (previousPath !== pathname && window.innerWidth < 800) {
            document.querySelector('body').style.overflow = '';
            setIsOpen(false);
        }
    }, [previousPath, pathname]);

    if (userLoading) {
        return null;
    }
    if (error) {
        return (
            <Error
                error={error}
                reset={() => Router.push({ pathname: '/login' })}
                text="Back to login"
            />
        );

    }
    if (!userData.user) {
        Router.push({
            pathname: "/login",
        });
        return null;
    }
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Meta/>
            <SideBar
                isOpen={isOpen}
                user={userData && userData.user ? userData.user : ''}
            />
            <Context.Provider value = {context}>
                {children}
            </Context.Provider>
        </ThemeProvider>
    );
}

function DefaultPage(props) {

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Meta/>
            {props.children}
        </ThemeProvider>
    );
}

const DefaultPageProvider = WithApollo(DefaultPage);

export default WithApollo(PageProvider);
export { DefaultPageProvider, Context, GET_USER_QUERY };

