import { useState, useEffect, useRef } from 'react';
import HorizontalScrollGallery from './Styles/HorizontalScrollStyles';
import TooltipInfo from './TooltipInfo';

const ScrollGallery = ({ selectedImages, setImages, productImages, setProductImages, toggleCropPhotoModal }) => {
    const gallery = useRef();
    const [updatingImages, setUpdating] = useState(false);
    const [newImagesAdded, setImagesAdded ] = useState(false);
    const [scroll, setScroll] = useState({
        scrollWidth: null,
        clientWidth: null,
    });

    useEffect(() => {
        const currentImages = [...productImages];
        if (selectedImages.length) {
            const sameImages = selectedImages.every((image, index) => image === currentImages[index]);
            let merged = currentImages.concat(selectedImages);
            if (!sameImages) {
                setProductImages(merged);
                setImagesAdded(true);
            }
            setImages([]);
        } else {
            setProductImages(productImages);
        }
    }, [selectedImages, productImages, setProductImages, setImages]);

    useEffect(() => {
        if (newImagesAdded && !updatingImages) {
            gallery.current.scrollTo({
                left: gallery.current.scrollWidth,
                behavior: "smooth",
            });
            setImagesAdded(false);
        }
    }, [newImagesAdded, updatingImages, gallery]);

    useEffect(() => {
        productImages.length && updateScrollPosition();
    }, [productImages]);

    const handleScrollRight = () => {
        const scrollPosition = (gallery.current.scrollWidth * .3) + gallery.current.scrollLeft;
        gallery.current.scrollTo({
            left: scrollPosition < 200 ? 600 : scrollPosition,
            behavior: "smooth",
        });
    }

    const handleScrollLeft = () => {
        const scrollPosition = gallery.current.scrollLeft - (gallery.current.scrollLeft * .5);
        const position = scrollPosition < 390 ? 0 : scrollPosition;
        gallery.current.scrollTo({
            left: position,
            behavior: "smooth",
        });
    }

    const moveImageLeft = (index) => {
        setUpdating(true);
        const images = [...productImages];
        let temp = images[index];
        images[index] = images[index-1];
        images[index-1] = temp;
        setProductImages(images);
        setUpdating(false);
    }

    const moveImageRight = (index) => {
        setUpdating(true);
        const images = [...productImages];
        let temp = images[index];
        images[index] = images[index + 1];
        images[index + 1] = temp;
        setProductImages(images);
        setUpdating(false);
    }

    const removeImage = (index) => {
        setUpdating(true);
        const images = [...productImages];
        images.splice(index, 1);
        setProductImages(images);
        setUpdating(false);
    }

    const updateScrollPosition = () => {
        setScroll({
            scrollWidth: gallery.current.scrollWidth,
            clientWidth: gallery.current.clientWidth,
            scrollLeft: gallery.current.scrollLeft,
            percentage: (100 * gallery.current.scrollLeft)/ (gallery.current.scrollWidth - gallery.current.clientWidth),
        });
    }

    if (productImages.length) return (
        <HorizontalScrollGallery onlyCard={productImages.length === 1}>
            <div className="gallery" ref={gallery} onScroll={updateScrollPosition}>
                <span className={`${scroll.scrollWidth === scroll.clientWidth ? "d-none" : scroll.percentage === 0 ? "d-none": ""} arrow-left`} onClick={handleScrollLeft}><i className="fas fa-angle-left icon"></i></span>
                {productImages.length ? productImages.map((card, index) =>
                    <GalleryCard
                        key={index}
                        card={card}
                        index={index}
                        moveImageLeft={moveImageLeft}
                        moveImageRight={moveImageRight}
                        productImages={productImages}
                        removeImage={removeImage}
                        toggleCropPhotoModal={toggleCropPhotoModal}
                    />,
                )
                    : null
                }
                <span className={`${scroll.scrollWidth === scroll.clientWidth ? "d-none" : scroll.percentage === 100 ? "d-none": ""} arrow-right`} onClick={handleScrollRight}><i className="fas fa-angle-right icon"></i></span>
            </div>
        </HorizontalScrollGallery>
    );
    return null;
}

const GalleryCard = ({ card, index,  moveImageLeft, productImages, moveImageRight, removeImage, toggleCropPhotoModal }) => {
    return (
        <div className="card-container">
            <div key={index} className="card" style={{backgroundImage: `url(${card.mltmd_url})`}}></div>
            <div className="image_manager">
                <button type="button" className={`${index === 0 ? "invisible" : ""} rp-button`} onClick={() => moveImageLeft(index)} disabled={index === 0}>
                    <i className="fas fa-angle-left manager_icon"></i>
                    <TooltipInfo
                        text="Move left"
                    />
                </button>
                <button type="button" className="rp-button" onClick={() => toggleCropPhotoModal(card.mltmd_url, index)}>
                    <i className="fas fa-pencil-alt manager_icon"></i>
                    <TooltipInfo
                        text="Edit image"
                    />
                </button>
                <button type="button" className="rp-button" onClick={() => removeImage(index)}>
                    <span className="span-x">&times;</span>
                    <TooltipInfo
                        text="Remove image"
                    />
                </button>
                <button type="button" className={`${index === productImages.length - 1 ? "invisible" : ""} rp-button`} onClick={() => moveImageRight(index)} disabled={index === productImages.length -1}>
                    <i className="fas fa-angle-right manager_icon"></i>
                    <TooltipInfo
                        text="Move right"
                    />
                </button>
            </div>
        </div>
    );
}
export default ScrollGallery;