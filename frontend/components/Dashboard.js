import React, { useState, useRef, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client'; 
import SideBar  from './AppSidebar'; 
import AppHeader from './AppHeader'; 
import { BackDrop } from './Styles/PageStyles'; 
import Router from 'next/router';

const GET_USER_QUERY = gql`
    query GET_USER_QUERY {
        user {
            FST_NAME,
            LST_NAME
        }
    }
`;

const DashBoard = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const { client, loading, data } = useQuery(GET_USER_QUERY, { fetchPolicy: "network-only" }); 
    const backDrop = useRef(null); 
    
    useEffect(() => {
        document.addEventListener('click', handleClick); 
        return () => document.removeEventListener('click', handleClick); 
    }, []); 

    const handleClick = (e) => {
        if(e.target.contains(backDrop.current)) {
            setIsOpen(false); 
            document.querySelector('body').style.overflow = ''; 
        } 
    }

    const toggleSideBar = () => { 
        if(!isOpen) document.querySelector('body').style.overflow = "hidden"; 
        setIsOpen(!isOpen); 
    }

    if (loading) return null; 
    if(!data.user) {
        Router.push({
            pathname: "/login"
        }); 
        return null; 
    }
    return (
        <div>
            <BackDrop isOpen={isOpen} ref={backDrop}/>
            <AppHeader 
            user={data.user ? data.user : ''}
            toggleSideBar={toggleSideBar}
            client={client}
            />
            <SideBar 
            isOpen={isOpen}
            user={data.user ? data.user : ''}/>
        </div>
    );
};


export default DashBoard;