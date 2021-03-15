import React, { useRef, useEffect, useContext } from 'react';
import AppHeader from './AppHeader';
import { BackDrop, StyledPage } from '../Styles/PageStyles';
import { Context } from './PageProvider';

const Page = ({ children, renderData }) => {
    const { isOpen, setIsOpen, client } = useContext(Context);
    const backDrop = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.contains(backDrop.current)) {
                setIsOpen(false);
                document.querySelector('body').style.overflow = '';
            }
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [setIsOpen]);


    const toggleSideBar = () => {
        if (!isOpen) document.querySelector('body').style.overflow = "hidden";
        setIsOpen(!isOpen);
    }

    return (
        <StyledPage>
            <BackDrop isOpen={isOpen} ref={backDrop}/>
            <AppHeader
                toggleSideBar={toggleSideBar}
                client={client}
                renderData={renderData.appBar}
            />
            {children}
        </StyledPage>
    );
};


export default Page;