import Nav from './Nav'; 
import Link from 'next/link'; 
import StyledHeader from './Styles/HeaderStyles'; 

const Header = () => {
    return (
        <StyledHeader>
            <Link href="/">
                <img src="https://res.cloudinary.com/dddnhychw/image/upload/v1595569683/Full%20Stack%20App/Logo_W__Title_4_evli4d.svg"/>
            </Link>
            <Nav/>
        </StyledHeader>
    );
};

export default Header;