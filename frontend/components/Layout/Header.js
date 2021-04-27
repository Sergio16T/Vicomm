import Nav from './Nav';
import Link from 'next/link';
import StyledHeader from '../Styles/HeaderStyles';
import useWindowWidth from '../../lib/Hooks/useWindowWidth';
import useScrollPosition from '../../lib/Hooks/useScrollPosition';

const Header = () => {
    const width = useWindowWidth();
    const scrollPosition = useScrollPosition();

    return (
        <StyledHeader scrollPosition={scrollPosition}>
            <Link href="/">
                {width > 480 ?
                    <img src="https://res.cloudinary.com/dddnhychw/image/upload/v1595569683/Full%20Stack%20App/Logo_W__Title_4_evli4d.svg"/>
                    :
                    <img src="https://res.cloudinary.com/dddnhychw/image/upload/v1595554422/Full%20Stack%20App/Owl_Logo_Image_ig8t0i.svg"/>
                }
            </Link>
            <Nav/>
        </StyledHeader>
    );
};

export default Header;