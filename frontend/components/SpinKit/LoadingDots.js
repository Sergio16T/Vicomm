import React from 'react';
import StyledLoadingDots from '../Styles/StyledLoadingDots';

const LoadingDots = () => {
    return (
        <StyledLoadingDots>
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </StyledLoadingDots>
    );
};

export default LoadingDots;