import { useEffect, useState } from 'react';

const useScrollPosition = () => {
    const [scroll, setScroll] = useState();

    useEffect(() => {
        setScroll(window.scrollY);
        const handleScroll = () => {
            setScroll(window.scrollY);
        }
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    return scroll;
};

export default useScrollPosition;