import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'; 
import SideBar  from './AppSidebar'; 
import AppHeader from './AppHeader'; 
import { BackDrop, ModalBackDrop, StyledPage } from './Styles/PageStyles'; 
import { PageContent } from './Styles/DashboardStyles'; 
import Router from 'next/router';
import ImageGalleryModal from './GalleryModal'; 
import Spinner from './Spinner'; 
import CoverPhoto from './CoverPhoto'; 

const GET_USER_QUERY = gql`
    query GET_USER_QUERY {
        user {
            FST_NAME,
            LST_NAME
        }
    }
`;
const GET_COVER_PHOTO_QUERY = gql`
    query GET_COVER_PHOTO_QUERY {
        getCoverPhoto {
            MLTMD_LG_URL
        }
    }
`; 
const UPDATE_COVER_PHOTO_MUTATION = gql`
    mutation UPDATE_COVER_PHOTO_MUTATION($key: ID!) {
        updateCoverPhoto(key: $key) {
            COVER_PHOTO_KEY
        }
    }
`;

const DashBoard = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const { client, loading: userLoading, data: userData } = useQuery(GET_USER_QUERY, { fetchPolicy: "network-only" }); 
    const { loading, data } = useQuery(GET_COVER_PHOTO_QUERY); 
    const [updateCoverPhoto] = useMutation(UPDATE_COVER_PHOTO_MUTATION, { refetchQueries: ["GET_COVER_PHOTO_QUERY"]})
    const [modalOpen, setModalOpen] = useState(false); 
    const [spinner, setSpinner] = useState(false); 
    const backDrop = useRef(null); 
    const modalBackDrop = useRef(null); 

    useEffect(() => {
        document.addEventListener('click', handleClick); 
        return () => document.removeEventListener('click', handleClick); 
    }, []); 

    const handleClick = (e) => {
        if(e.target.contains(backDrop.current)) {
            setIsOpen(false); 
            document.querySelector('body').style.overflow = ''; 
        } 
        if(e.target.contains(modalBackDrop.current)) {
            setModalOpen(false); 
            document.querySelector('body').style.overflow = ''; 
        }
    }

    const toggleSideBar = () => { 
        if(!isOpen) document.querySelector('body').style.overflow = "hidden"; 
        setIsOpen(!isOpen); 
    }

    if (userLoading) return null; 
    if(!userData.user) {
        Router.push({
            pathname: "/login"
        }); 
        return null; 
    }
    const toggleModal = () => {
        if(!modalOpen) document.querySelector('body').style.overflow = "hidden"; 
        else document.querySelector('body').style.overflow = "";
        setModalOpen(!modalOpen); 
    }
    const uploadCoverPhoto = async (selected, cb) => {
        const [image] = Object.values(selected); 
        const MLTMD_KEY = parseInt(image.MLTMD_KEY); 
        await updateCoverPhoto({ variables: { key: MLTMD_KEY }}).catch(err => { throw err; }); 
        cb({}); 
        toggleModal();
    }
    if(userLoading) return null; 
    return (
        <StyledPage>
            <BackDrop isOpen={isOpen} ref={backDrop}/>
            <ModalBackDrop isOpen={modalOpen} ref={modalBackDrop}/>
            <AppHeader 
            user={userData.user ? userData.user : ''}
            toggleSideBar={toggleSideBar}
            client={client}  
            toggleModal={toggleModal}
            />
            <SideBar 
            isOpen={isOpen}
            user={userData.user ? userData.user : ''}/>
            <PageContent>
                <CoverPhoto
                loading={loading}
                data={data}
                />
                <div className="welcome-section">

                </div>
                <div className="feature-section">
                    <div className="feature-suggestion">
                        <h3>Add a Product And Start Selling</h3>
                        <span>Add Photos, Details, and Variants.</span>
                    </div>
                    <div className="feature-suggestion">
                        <h3>Logo</h3>
                        <span> Give your site a personal touch by uploading your own logo!</span>
                    </div>
                </div>    
            </PageContent>
            <ImageGalleryModal 
            show={modalOpen} 
            toggleModal={toggleModal}
            modalXColor={"white"}
            user={userData.user ? userData.user : ''}
            setSpinner={setSpinner}
            useMLTMD={uploadCoverPhoto} 
            />
            <Spinner 
            show={modalOpen}
            spinner={spinner}/>
        </StyledPage>
    );
};
 

export default DashBoard;