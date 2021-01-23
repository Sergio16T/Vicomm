import React from 'react';
import { StyledGallery } from './Styles/ImageGalleryStyles';

const ImageGallery = (props) => {
    const { multiMedia, selected, handleSelect } = props;
    return (
        <StyledGallery>
            {multiMedia.length ?
                <div className="img-gallery">
                    {multiMedia.map((image) =>
                        <div
                            key={image.id}
                            className={`${image.id in selected ? "selected" : ""} gallery-img`}
                            style={{backgroundImage: `url(${image.mltmd_url})`}}
                            onClick={() => handleSelect(image)}
                        >
                             {image.id in selected ? <div className="check-circle"><i className="fas fa-check checkIcon"></i></div> : null}
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

export default ImageGallery;