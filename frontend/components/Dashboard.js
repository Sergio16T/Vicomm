import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'; 
import { PageContent } from './Styles/DashboardStyles'; 
import ImageGalleryModal from './GalleryModal'; 
import CoverPhoto from './CoverPhoto'; 
import Page from './Page'; 
import Link from 'next/link'; 

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

const DashBoard = ({ modalOpen, toggleModal, userData, setSpinner }) => {
    const { loading, data } = useQuery(GET_COVER_PHOTO_QUERY); 
    const [updateCoverPhoto] = useMutation(UPDATE_COVER_PHOTO_MUTATION, { refetchQueries: ["GET_COVER_PHOTO_QUERY"]});

    const uploadCoverPhoto = async (selected, cb) => {
        const [image] = Object.values(selected); 
        const MLTMD_KEY = parseInt(image.MLTMD_KEY); 
        await updateCoverPhoto({ variables: { key: MLTMD_KEY }}).catch(err => { throw err; }); 
        cb({}); 
        toggleModal();
    }

    return (
        <PageContent>
            <CoverPhoto
            loading={loading}
            data={data}
            />
            <div className="welcome-section">

            </div>
            <div className="feature-section">
                <Link href="products">
                    <div className="feature-suggestion">
                        <h3>Add a Product And Start Selling</h3>
                        <span>Add Photos, Details, and Variants.</span>
                    </div>
                </Link>
                <div className="feature-suggestion">
                    <h3>Logo</h3>
                    <span> Give your site a personal touch by uploading your own logo!</span>
                </div>
            </div>    
            <ImageGalleryModal 
            show={modalOpen} 
            toggleModal={toggleModal}
            modalXColor={"white"}
            user={userData.user ? userData.user : ''}
            setSpinner={setSpinner}
            useMLTMD={uploadCoverPhoto}
            multiSelect={false}
            />
        </PageContent>    
    );  
};
 
const DashboardPage = (props) => {
    return (
        <Page render={({ toggleModal }) => <ToggleImageGalleryBtn toggleModal={toggleModal}/>}>
            {({ modalOpen, toggleModal, userData, setSpinner }) => 
                <DashBoard
                modalOpen={modalOpen}
                toggleModal={toggleModal}
                userData={userData}
                setSpinner={setSpinner}
                />
            }
        </Page>
    )
}

const ToggleImageGalleryBtn = ({ toggleModal }) => {
    return (
        <img id="uploadImageIcon" onClick={toggleModal} src="https://res.cloudinary.com/dddnhychw/image/upload/v1596157219/Full%20Stack%20App/untitled_6_saqq66.svg"/>
    ); 
}
export default DashboardPage;