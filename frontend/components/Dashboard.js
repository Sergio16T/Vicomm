import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client'; 
import { AppHeader, SideBar }  from './AppSidebar'; 

const GET_USER_QUERY = gql`
    query GET_USER_QUERY {
        user {
            FST_NAME,
            LST_NAME
        }
    }
`;

const DashBoard = () => {
    const { loading, error, data } = useQuery(GET_USER_QUERY); 
    if (loading) return null; 
    if (error) return null; 
    if (data) return (
        <div>
            <AppHeader/>
            <SideBar user={data.user ? data.user : ''}/>
        </div>
    );
};


export default DashBoard;