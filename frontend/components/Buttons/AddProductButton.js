import styled from 'styled-components';
import Link from 'next/link';

const StyledAddButton = styled.button`
    outline: none;
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    margin-right: 1rem;
    .plusIcon {
        font-size: 1.4rem;
        margin-right: 1rem;
    }
`;


const AddProductButton = () => {
    return (
        <Link href="/product/add">
            <StyledAddButton>
                <i className="fas fa-plus-circle plusIcon"></i>
                <span>Add</span>
            </StyledAddButton>
        </Link>
    );
}

export default AddProductButton;