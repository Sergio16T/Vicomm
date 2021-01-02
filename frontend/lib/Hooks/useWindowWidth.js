import { useState, useEffect } from 'react';

const useWindowWidth = () => {
    const [width, setWidth] = useState();

    useEffect(() => {
        setWidth(window.innerWidth);
        const eventListener = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', eventListener);
        return () => {
            window.removeEventListener('resize', eventListener);
        }
    }, []);

    return {
        width
    }
}

export default useWindowWidth;