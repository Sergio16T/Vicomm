import React,  { useState, useRef, useEffect, useContext } from 'react';
import AppHeader from './AppHeader';
import { BackDrop, ModalBackDrop, StyledPage } from '../Styles/PageStyles';
import Spinner from '../SpinKit/ChaseSpinner';
import { Context } from './PageProvider';

const PageContext = React.createContext();

const Page = props => {
    const { isOpen, setIsOpen, client } = useContext(Context);
    const [modalOpen, setModalOpen] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const backDrop = useRef(null);
    const modalBackDrop = useRef(null);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleClick = (e) => {
        if (e.target.contains(backDrop.current)) {
            setIsOpen(false);
            console.log('contains')
            document.querySelector('body').style.overflow = '';
        }
        if (e.target.contains(modalBackDrop.current)) {
            setModalOpen(false);
            document.querySelector('body').style.overflow = '';
        }
    }

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
            <AppHeader
                toggleSideBar={toggleSideBar}
                client={client}
                toggleModal={toggleModal}
                render={() => props.render({ toggleModal })}
                text={props.text}
            />
            <PageContext.Provider value={{ modalOpen, toggleModal, setSpinner }}>
                {props.children}
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