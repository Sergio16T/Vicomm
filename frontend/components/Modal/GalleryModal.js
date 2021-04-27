import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import ImageGallery from '../ImageGallery';
import ImgSelectedHeader from './ModalSelectedImagesHeader';
import UploadImgHeader from './ModalUploadImgHeader';
import Modal from './Modal';

const GET_IMG_GALLERY = gql`
    query GET_IMG_GALLERY{
        getImageGallery {
            id
            mltmd_url
        }
    }
`;

const UPLOAD_IMG_MUTATION = gql`
    mutation UPLOAD_IMG_MUTATION($image: String!, $largeImage: String!) {
        uploadImageToGallery(image: $image, largeImage: $largeImage) {
            id
            mltmd_url
        }
    }
`;

const DELETE_IMGS_MUTATION = gql`
    mutation DELETE_IMGS_MUTATION($keys: [ID]) {
        deleteImages(keys: $keys) {
            keys
        }
    }
`;

const UploadImageModal = (props) => {
    const { loading, data } = useQuery(GET_IMG_GALLERY);
    const [uploadImageToGallery] = useMutation(UPLOAD_IMG_MUTATION, { refetchQueries: ['GET_IMG_GALLERY'] });
    /* replaced refetch with custom update function { refetchQueries: ['GET_IMG_GALLERY']}*/
    const [deleteImages] = useMutation(DELETE_IMGS_MUTATION, {
        update(cache, { data: { deleteImages } }) {
            const { getImageGallery } = cache.readQuery({ query: GET_IMG_GALLERY });
            const newGalleryImages = getImageGallery.filter(image => !deleteImages.keys.includes(image.id));
            cache.writeQuery({
                query: GET_IMG_GALLERY,
                data: { getImageGallery: newGalleryImages },
            });
        },
    });
    const [selected, setSelected] = useState({});
    const [count, setCount] = useState(0);
    const uploadInput = useRef();
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        !props.show && setSelected({});
    }, [props.show]);

    const handleSelect = (image) => {
        let selectedImages = { ...selected };
        if (image.id in selectedImages) {
            delete selectedImages[image.id];
        } else {
            selectedImages = {};
            selectedImages[image.id] = image;
        }
        setSelected(selectedImages);
        setCount(Object.keys(selectedImages).length);
    }

    const handleMultiSelect = (image) => {
        let selectedImages = { ...selected };
        if (image.id in selectedImages) {
            delete selectedImages[image.id];
        } else {
            selectedImages[image.id] = image;
        }
        setSelected(selectedImages);
        setCount(Object.keys(selectedImages).length);
    }

    const uploadFile = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Vicomm');
        try {
            setSpinner(true);
            const res = await fetch('https://api.cloudinary.com/v1_1/dddnhychw/image/upload', {
                method: 'POST',
                body: data,
            });
            const file = await res.json();

            if (Object.prototype.hasOwnProperty.call(file, "error")) {
                throw file.error.message;
            }
            await uploadImageToGallery({
                variables: {
                    image: file.secure_url,
                    largeImage: file.eager[0].secure_url,
                },
            });
            uploadInput.current.value= "";
            setSpinner(false);
        }
        catch (err) {
            console.log(err);
            uploadInput.current.value= "";
            setSpinner(false);
        }
    }
    const deleteMultimedia = async () => {
        setSpinner(true);
        setTimeout( async () => {
            await deleteImages({ variables: { keys: Object.keys(selected) } });
            setSelected({});
            setSpinner(false);
        }, 500);

    }
    return (
        <Modal
            setModalOpen={props.setModalOpen}
            spinner={spinner}
            show={props.show}
            style={{ xColor: "white", minHeight: "80vh" }}
        >
            {!Object.keys(selected).length ?
                <UploadImgHeader
                    uploadInput={uploadInput}
                    uploadFile={uploadFile}
                    toggleModal={props.toggleModal}
                    multiSelect={props.multiSelect}
                />
                :
                <ImgSelectedHeader
                    count={count}
                    deleteMultimedia={deleteMultimedia}
                    useMLTMD={props.useMLTMD}
                    setSelected={setSelected}
                    selected={selected}
                    multiSelect={props.multiSelect}
                />
            }

            <div className="modal-content">
                {!loading && data ?
                    <ImageGallery
                        multiMedia ={data.getImageGallery}
                        //  multiMedia ={[]}
                        handleSelect={props.multiSelect ? handleMultiSelect : handleSelect}
                        selected={selected}
                    />
                    :
                    null
                }
            </div>
        </Modal>
    );
}




export default UploadImageModal;
export { UPLOAD_IMG_MUTATION };
