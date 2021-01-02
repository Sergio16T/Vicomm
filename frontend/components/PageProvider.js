import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router';
import WithApollo from '../lib/ApolloClient';
import { ThemeProvider }  from 'styled-components';
import Meta from './Meta';
import SideBar  from './AppSidebar';
import { theme, GlobalStyle } from './Styles/PageStyles';
import usePrevious from '../lib/Hooks/usePrevious';
import smoothscroll from 'smoothscroll-polyfill';

const GET_USER_QUERY = gql`
    query GET_USER_QUERY {
        user {
            FST_NAME,
            LST_NAME
        }
    }
`;

const Context = React.createContext();

function PageProvider(props) {
    const { client, loading: userLoading, data: userData } = useQuery(GET_USER_QUERY);
    const [isOpen, setIsOpen ] = useState(false);
    const previousPath = usePrevious(props.pathname);
    const context = {
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        client,
        userData
    }

    useEffect(() => {
        smoothscroll.polyfill();
    },[]);

    useEffect(() => {
        if(previousPath !== props.pathname && window.innerWidth < 800) {
            document.querySelector('body').style.overflow = '';
            setIsOpen(false);
        }
    },[props.pathname]);

    if (userLoading) return null;
    if(!userData.user) {
        Router.push({
            pathname: "/login"
        });
        return null;
    }
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Meta/>
            <SideBar
            isOpen={isOpen}
            user={userData.user ? userData.user : ''}
            />
            <Context.Provider value = {context}>
                {props.children}
            </Context.Provider>
        </ThemeProvider>
    );
}

function DefaultPage(props) {

    useEffect(() => {
        smoothscroll.polyfill();
    },[]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Meta/>
                {props.children}
        </ThemeProvider>
    )
}

const DefaultPageProvider = WithApollo(DefaultPage);

export default WithApollo(PageProvider);
export { DefaultPageProvider, Context, GET_USER_QUERY };

