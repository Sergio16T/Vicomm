import React, { useState, useRef, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client'; 
import SideBar  from './AppSidebar'; 
import AppHeader from './AppHeader'; 
import { BackDrop, ModalBackDrop, StyledPage } from './Styles/PageStyles'; 
import { PageContent } from './Styles/DashboardStyles'; 
import Router from 'next/router';
import Modal from './Modal'; 
import styled from 'styled-components'; 

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
    const [modalOpen, setModalOpen] = useState(false); 
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

    if (loading) return null; 
    if(!data.user) {
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
    if(loading) return null; 
    return (
        <StyledPage>
            <BackDrop isOpen={isOpen} ref={backDrop}/>
            <ModalBackDrop isOpen={modalOpen} ref={modalBackDrop}/>
            <AppHeader 
            user={data.user ? data.user : ''}
            toggleSideBar={toggleSideBar}
            client={client}  
            toggleModal={toggleModal}
            />
            <SideBar 
            isOpen={isOpen}
            user={data.user ? data.user : ''}/>
            <PageContent>
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
            <Modal 
            show={modalOpen} 
            toggleModal={toggleModal}
            modalXColor={"white"}
            user={data.user ? data.user : ''}
            >
                {({ data }) => 
                    <ImageGallery multiMedia={data.getImageGallery}/>
                }
       
            </Modal>
        </StyledPage>
    );
};
 
const StyledGallery = styled.div`
    width: 100%;
    height: 100%;
    display: flex; 
    flex-direction: column; 
    .img-gallery {
        box-sizing: border-box; 
        width: 100%; 
        height: 100%; 
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-gap: 15px; 
        padding: 2rem 1.5rem; 
        .gallery-img {
            background-size: cover; 
            background-position: center;
            width: 100%;
            height: 180px; 
            cursor: pointer; 
            transition: transform .4s ease; 
            position: relative; 
            .check-circle {
                position: absolute; 
                /* color: rgb(255,171,0); */
                top: -10px; 
                left: -10px; 
                font-size: 1.8rem;
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                background: rgb(255,171,0); 
                padding: .5rem; 
                .checkIcon {
                    color: white; 
                    /* background: white;  */
                    border-radius: 50%; 
                }
            }
        }
        .selected {
            transform: scale(0.9); 
        }
        
    }
    .no-img-message {
        margin: auto; 
        transform: translateY(100px); 
        p {
            font-size: 1.6rem; 
        }
    }
    @media (max-width: 1100px) {
        .img-gallery {
            grid-template-columns: 1fr 1fr; 
            .gallery-img {
                height: 160px; 
            }
        }
    }
    @media (max-width: 600px) {
        .img-gallery { 
            .gallery-img {
                height: 120px; 
            }
        }
      
    }
`; 
const ImageGallery = (props) => {
    const { multiMedia } = props; 
    const [selected, setSelected] = useState({}); 

    const handleSelect = (image) => {
        console.log(image);
        const selectedImages = {...selected}; 
        if(image.MLTMD_KEY in selectedImages) delete selectedImages[image.MLTMD_KEY]; 
        else selectedImages[image.MLTMD_KEY] = image; 
        setSelected(selectedImages); 
    }
    return (
        <StyledGallery>
            {multiMedia.length ? 
                <div className="img-gallery">
                    {multiMedia.map((image) => 
                        <div 
                        key={image.MLTMD_KEY} 
                        className={`${image.MLTMD_KEY in selected ? "selected" : ""} gallery-img`} 
                        style={{backgroundImage: `url(${image.MLTMD_URL})`}} 
                        onClick={() => handleSelect(image)}>
                             {image.MLTMD_KEY in selected ? <div className="check-circle"><i class="fas fa-check checkIcon"></i></div> : null}; 
                        </div>
                    )} 
                </div>
          : 
                <div className="no-img-message">
                    <p>You don't have any images</p>
                </div>
            }
        </StyledGallery>
    );
}
export default DashBoard;