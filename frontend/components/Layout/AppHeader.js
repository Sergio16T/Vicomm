import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useMutation, gql } from '@apollo/client';
import { StyledHeader, StyledMenu, SubMenu } from '../Styles/AppHeaderStyles';

const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        signOut {
            message
        }
    }
`;

const AppHeader = (props) => {
    const {
        client,
        renderData: {
            render,
            renderPosition,
            text,
        },
        toggleSideBar,
    } = props;
    return (
        <StyledHeader>
            <div className="nav-left">
                <div id="hamburger" onClick={toggleSideBar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span id="userName">{text}</span>
                {renderPosition === "left" && render()}
            </div>
            <div className="nav-right">
                {renderPosition === "right" && render()}
                <VerticalDotMenu>
                    <LogoutButton
                        client={client}
                    />
                </VerticalDotMenu>
            </div>
        </StyledHeader>
    );
}

const VerticalDotMenu = ({ children }) => {
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

    return (
        <StyledMenu onClick={() => setIsOpen(true)} ref={dotMenu}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <SubMenu isOpen={isOpen} ref={subMenu}>
                {children}
            </SubMenu>
        </StyledMenu>
    );
}

const LogoutButton = (props) => {
    const [signOut] = useMutation(SIGN_OUT_MUTATION);

    const logOut = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        props.client.clearStore();
        await signOut();

        Router.push({
            pathname: "/",
        });
    }
    return (
        <span>
            <button className="logOutBtn" onClick={logOut}> Log Out </button>
        </span>
    )
}

export default AppHeader;
export { VerticalDotMenu };