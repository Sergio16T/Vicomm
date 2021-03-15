import { useState } from 'react';

const useModal = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        if (!modalOpen) document.querySelector('body').style.overflow = "hidden";
        else document.querySelector('body').style.overflow = "";
        setModalOpen(!modalOpen);
    }

    return { modalOpen, setModalOpen, toggleModal };
};

export default useModal;