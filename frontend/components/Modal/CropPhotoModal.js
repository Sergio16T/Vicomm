import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import { UPLOAD_IMG_MUTATION } from './GalleryModal';
import styled from 'styled-components';
import ModalHeader from './ModalHeader';
import ReactCrop from 'react-image-crop';
import PrimaryButton from '../Buttons/PrimaryButton';

const StyledCrop = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 440px;
`;

const CropPhotoModal = ({ toggleModal, imageUrl, setSpinner, updateProductImages }) => {
    const [uploadImageToGallery] = useMutation(UPLOAD_IMG_MUTATION, {
        update(cache, { data: { uploadImageToGallery } }) {
            cache.modify({
                fields: {
                    getImageGallery(existingMultimedia = []) {
                        const newImage = cache.writeFragment({
                            data: uploadImageToGallery,
                            fragment: gql`
                                fragment newMedia on MultiMedia {
                                    id
                                    mltmd_url
                                    type
                                }
                            `
                        });
                        return [...existingMultimedia, newImage]
                    }
                }
            });
        }
    });
    const [crop, setCrop] = useState({
        unit: 'px',
        x: 130,
        y: 50,
        width: 300,
        height: 300
    });
    const [completedCrop, setCompletedCrop] = useState({
        unit: 'px',
        x: 130,
        y: 50,
        width: 300,
        height: 300
    });
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        imageRef.current = null;
        setImageLoaded(false);
    }, [imageUrl]);

    useEffect(() => {
        if (imageUrl) {
            const downloadedImg = new Image;
            downloadedImg.crossOrigin = "Anonymous";
            downloadedImg.src = imageUrl;
            imageRef.current = downloadedImg;
            setImageLoaded(true);
        }
    }, [imageUrl]);

    const onLoad = useCallback((img) => {
        const downloadedImg = new Image;
        downloadedImg.crossOrigin = "Anonymous";
        downloadedImg.src = img.src;
        imageRef.current = downloadedImg;
    }, []);

    const savePhoto = async () => {
        console.log('save');
        if (!completedCrop) {
            // notify user they must crop error message
            return;
        }
        try {
            const image = imageRef.current;
            const canvas = document.createElement('canvas');
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height,
            );

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = "Cropped Photo";

                const newImage = new File([blob], blob.name, { type: blob.type });
                const data = new FormData();
                data.append('file', newImage);
                data.append('upload_preset', 'Vicomm');
                // create new photo upload in cloudinary
                setSpinner(true);
                const res = await fetch('https://api.cloudinary.com/v1_1/dddnhychw/image/upload', {
                    method: 'POST',
                    body: data
                });
                const file = await res.json();
                console.log('new file upload', file)
                if (Object.prototype.hasOwnProperty.call(file, "error")) throw file.error.message;
                // create new record in DB
                const { data: { uploadImageToGallery: image } } = await uploadImageToGallery({
                    variables: {
                        image: file.secure_url,
                        largeImage: file.eager[0].secure_url
                    }
                });
                console.log('image response from server', image);
                updateProductImages(image.id, image.mltmd_url);
                toggleModal();
                setSpinner(false);
            }, 'image/jpeg');
        }
        catch (err) {
            console.log(err);
            setSpinner(false);
        }

    }

    return (
        <>
            <ModalHeader
                header="Image Editor"
                toggleModal={toggleModal}
                render={() => <PrimaryButton onClick={savePhoto}/>}
            />
            <div className="modal-content crop-content">
                {imageLoaded &&
                    <StyledCrop>
                        <ReactCrop
                            onImageLoaded={onLoad}
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                            src={imageRef.current.src}
                        />
                    </StyledCrop>
                }
            </div>
        </>
    );
};

export default CropPhotoModal;