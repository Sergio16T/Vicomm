import React, { useContext } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { PageContent } from './Styles/DashboardStyles';
import ImageGalleryModal from './Modal/GalleryModal';
import CoverPhoto from './CoverPhoto';
import Page from './Layout/Page';
import Link from 'next/link';
import { Context } from './Layout/PageProvider';
import ToggleImageGalleryBtn from './Buttons/ToggleImageGalleryBtn';
import useModal from '../lib/Hooks/useModal';

const GET_COVER_PHOTO_QUERY = gql`
    query GET_COVER_PHOTO_QUERY {
        getCoverPhoto {
            mltmd_lg_url
        }
    }
`;
const UPDATE_COVER_PHOTO_MUTATION = gql`
    mutation UPDATE_COVER_PHOTO_MUTATION($key: ID!) {
        updateCoverPhoto(key: $key) {
            id
        }
    }
`;

const Dashboard = ({ modalOpen, setModalOpen, toggleModal }) => {
    const { loading, error, data } = useQuery(GET_COVER_PHOTO_QUERY);
    const [updateCoverPhoto] = useMutation(UPDATE_COVER_PHOTO_MUTATION, { refetchQueries: ["GET_COVER_PHOTO_QUERY"] });

    const uploadCoverPhoto = async (selected, cb) => {
        const [image] = Object.values(selected);
        const MLTMD_KEY = parseInt(image.id);
        await updateCoverPhoto({ variables: { key: MLTMD_KEY } });
        cb({});
        toggleModal();
    }

    return (
        <PageContent>
            <CoverPhoto
                error={error}
                loading={loading}
                data={data}
            />
            <div className="welcome-section">

            </div>
            <div className="feature-section">
                <Link href="/product/add">
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
                setModalOpen={setModalOpen}
                useMLTMD={uploadCoverPhoto}
            />
        </PageContent>
    );
};

const DashboardPage = () => {
    const { userData } = useContext(Context);
    const { modalOpen, setModalOpen, toggleModal } = useModal();

    const render = () => <ToggleImageGalleryBtn toggleModal={toggleModal}/>;

    return (
        <Page
            renderData = {{
                appBar: {
                    render,
                    renderPosition: "right",
                    text: `${userData.user.fst_nm}'s Store`,
                },
            }}
        >
            <Dashboard
                modalOpen={modalOpen}
                toggleModal={toggleModal}
                setModalOpen={setModalOpen}
            />
        </Page>
    );
}

export default DashboardPage;