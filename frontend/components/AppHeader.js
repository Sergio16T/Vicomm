import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { StyledHeader, StyledMenu, SubMenu } from './Styles/AppHeaderStyles';

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        signOut {
            message
        }
    }
`;


const AppHeader = (props) => {
    const { text } = props;
    return (
        <StyledHeader>
            <div className="nav-left">
                <div id="hamburger" onClick={props.toggleSideBar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span id="userName">{text}</span>
            </div>
            <div className="nav-right">
                {props.render()}
                <VerticalDotMenu
                    client={props.client}
                />
            </div>
        </StyledHeader>
    );
}



const VerticalDotMenu = (props) => {
    const [signOut, { data }] = useMutation(SIGN_OUT_MUTATION);
    const [isOpen, setIsOpen] = useState(false);
    const subMenu = useRef(null);
    const dotMenu = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleClick = (e) => {
        if (!dotMenu.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    const logOut = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        props.client.clearStore();
        await signOut();

        Router.push({
            pathname: "/"
        });
    }
    return (
        <StyledMenu onClick={() => setIsOpen(true)} ref={dotMenu}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <SubMenu isOpen={isOpen} ref={subMenu}>
                <span>
                    <button className="logOutBtn" onClick={logOut}> Log Out </button>
                </span>
            </SubMenu>
        </StyledMenu>
    );
}
export default AppHeader;