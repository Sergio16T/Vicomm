import React from 'react';
import StyledLoadingDots from '../Styles/StyledLoadingDots';

const LoadingDots = () => {
    return (
        <StyledLoadingDots>
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </StyledLoadingDots>
    );
};

export default LoadingDots;