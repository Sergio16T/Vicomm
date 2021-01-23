import Link from 'next/link';
import StyledNav from '../Styles/NavStyles';

const Nav = () => {
    return (
        <StyledNav>
            <Link href="/login">
                <li>Login</li>
            </Link>
            <Link href="/signup">
                <li>
                    <button> Get Started </button>
                </li>
            </Link>
        </StyledNav>
    );
};

export default Nav;