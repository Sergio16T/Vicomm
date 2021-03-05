import React,  { useState, useRef, useEffect, useContext } from 'react';
import AppHeader from './AppHeader';
import { BackDrop, ModalBackDrop, StyledPage } from '../Styles/PageStyles';
import Spinner from '../SpinKit/ChaseSpinner';
import { Context } from './PageProvider';

const PageContext = React.createContext();

const Page = ({ children, renderData }) => {
    const { isOpen, setIsOpen, client } = useContext(Context);
    const [modalOpen, setModalOpen] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const backDrop = useRef(null);
    const modalBackDrop = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.contains(backDrop.current)) {
                setIsOpen(false);
                document.querySelector('body').style.overflow = '';
            }
            if (e.target.contains(modalBackDrop.current)) {
                setModalOpen(false);
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

    const toggleModal = () => {
        if (!modalOpen) document.querySelector('body').style.overflow = "hidden";
        else document.querySelector('body').style.overflow = "";
        setModalOpen(!modalOpen);
    }

    return (
        <StyledPage>
            <BackDrop isOpen={isOpen} ref={backDrop}/>
            <ModalBackDrop isOpen={modalOpen} ref={modalBackDrop}/>
            <PageContext.Provider value={{ modalOpen, toggleModal, setSpinner }}>
                <AppHeader
                    toggleSideBar={toggleSideBar}
                    client={client}
                    renderData={renderData.appBar}
                />
                {children}
            </PageContext.Provider>
            <Spinner
                show={modalOpen}
                spinner={spinner}
            />
        </StyledPage>
    );
};


export default Page;
export { PageContext };