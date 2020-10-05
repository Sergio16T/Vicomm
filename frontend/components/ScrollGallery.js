import { useEffect, useRef } from 'react'; 
import HorizontalScrollGallery from './Styles/HorizontalScrollStyles'; 

const ScrollGallery = ({ selectedImages, setImages, productImages, setProductImages }) => {
    const gallery = useRef(); 

    useEffect(() => {
        const currentImages = [...productImages]; 
        if(selectedImages.length) {
            const sameImages = selectedImages.every((image, index) => image === currentImages[index]); 
            let merged = currentImages.concat(selectedImages);
            if(!sameImages) {
                setProductImages(merged);
            }
            setImages([]);
        }
    },[selectedImages]); 

    useEffect(() => {
        productImages.length && gallery.current.scrollTo({
            left: gallery.current.scrollWidth,
            behavior: "smooth"
        });
    },[productImages]); 

    const handleScrollRight = () => {
        const scrollPosition = (gallery.current.scrollWidth * .3) + gallery.current.scrollLeft; 
        gallery.current.scrollTo({
            left: scrollPosition < 200 ? 600 : scrollPosition, 
            behavior: "smooth"
        }); 
    }

    const handleScrollLeft = () => {
        const scrollPosition = gallery.current.scrollLeft - (gallery.current.scrollLeft * .5); 
        const position = scrollPosition < 390 ? 0 : scrollPosition;
        gallery.current.scrollTo({
            left: position,
            behavior: "smooth"
        });
    }
    if(productImages.length) return (
        <HorizontalScrollGallery onlyCard={productImages.length === 1}>
            <div className="gallery" ref={gallery}>
                <span className={`${productImages.length <= 1 ? "d-none" : ""} arrow-left`} onClick={handleScrollLeft}><i className="fas fa-angle-left icon"></i></span>
                {productImages.length ? productImages.map((card,index) =>  
                    <div className="card-container" key={index}>
                        <div key={index} className="card" style={{backgroundImage: `url(${card.MLTMD_URL})`}}></div>
                    </div>)
                    : null
                }
                <span className={`${productImages.length <= 1 ? "d-none" : ""} arrow-right`} onClick={handleScrollRight}><i className="fas fa-angle-right icon"></i></span>
            </div>
        </HorizontalScrollGallery>
    ); 
    return null
}

export default ScrollGallery; 