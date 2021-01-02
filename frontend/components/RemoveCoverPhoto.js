import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { StyledFaIcon } from './Styles/ImageGalleryStyles';
import TooltipInfo from './TooltipInfo';

const REMOVE_COVER_PHOTO_MUTATION = gql`
    mutation REMOVE_COVER_PHOTO_MUTATION {
        removeCoverPhoto {
            message
        }
    }
`;

const RemoveCoverPhotoBtn = ({ toggleModal }) => {
    const [removeCoverPhoto] = useMutation(REMOVE_COVER_PHOTO_MUTATION, { refetchQueries: ["GET_COVER_PHOTO_QUERY"]});

    const deleteCoverPhoto = async () => {
        await removeCoverPhoto();
        toggleModal();
    }
    return (
        <StyledFaIcon onClick={deleteCoverPhoto}>
            <i className="fas fa-trash"></i>
            <TooltipInfo text="Remove Cover Photo"/>
        </StyledFaIcon>
    );
}

export default RemoveCoverPhotoBtn;