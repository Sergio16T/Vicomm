import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledPagination = styled.div`
    color: rgba(0,0,0,0.4);
    padding: 0 1rem;
    transition: color .2s ease-in;
    button {
        background: transparent;
        cursor: pointer;
        border: 0;
        &:first-of-type {
            padding-right: 0;
        }
        &:nth-of-type(2) {
            margin-right: 10px;
        }
        &:nth-of-type(3) {
            margin-left: 10px;
        }
        &:last-of-type {
            padding-left: 0;
        }
        &:focus {
            outline: none;
        }
        &:hover:not([disabled]) {
           color: ${props => props.theme.skyBlue};
        }
    }
    span {
        min-width: 57.16px;
    }
`;

const Pagination = ({ basepath, count, fetchMore, numberPerPage }) => {
    const router = useRouter();
    const page = parseInt(router.query.page);
    let numberOfPages = Math.ceil(count/numberPerPage) || 1;

    useEffect(() => {
        fetchMore({
            variables: {
                page: page,
            },
        });
    }, [page, fetchMore]);

    const goToPage1 = () => {
        router.push({
            pathname: basepath,
            query: { page: 1 },
        }, undefined, { shallow: true });
    }

    const goToLastPage = () => {
        router.push({
            pathname: basepath,
            query: { page: numberOfPages },
        }, undefined, { shallow: true });
    }

    const goToNextPage = () => {
        router.push({
            pathname: basepath,
            query: { page: page + 1 },
        }, undefined, { shallow: true });
    }

    const goToPreviousPage = () => {
        router.push({
            pathname: basepath,
            query: { page: page - 1 },
        }, undefined, { shallow: true });
    }

    return (
        <StyledPagination>
            <button
                disabled={page === 1}
                onClick={goToPage1}
            >
                <i className="fas fa-angle-double-left"></i>
            </button>
            <button
                disabled={page === 1}
                onClick={goToPreviousPage}
            >
                <i className="fas fa-angle-left"></i>
            </button>
            <span>Page {page} of {numberOfPages}</span>
            <button
                disabled={page === numberOfPages}
                onClick={goToNextPage}
            >
                <i className="fas fa-angle-right"></i>
            </button>
            <button
                disabled={page === numberOfPages}
                onClick={goToLastPage}
            >
                <i className="fas fa-angle-double-right"></i>
            </button>
        </StyledPagination>
    );
};

export default Pagination;