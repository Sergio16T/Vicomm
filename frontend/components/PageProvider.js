import React, { useState } from 'react'; 
import { useQuery, gql } from '@apollo/client'; 
import Router from 'next/router';
import WithApollo from '../lib/ApolloClient'; 
import { ThemeProvider }  from 'styled-components'; 
import Meta from './Meta'; 
import SideBar  from './AppSidebar'; 
import { theme, GlobalStyle } from './Styles/PageStyles'; 

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
    const context = {
        isOpen: isOpen, 
        setIsOpen: setIsOpen,
        client, 
        userData
    }

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

