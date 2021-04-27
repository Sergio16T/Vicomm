import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledPagination = styled.div`
    color: rgba(0,0,0,0.4);
    padding: 0 1rem;
    button {
        background: transparent;
        cursor: pointer;
        border: 0;
        &:first-of-type {
            margin-right: 10px;
        }
        &:last-of-type {
            margin-left: 10px;
        }
        &:focus {
            outline: none;
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
        </StyledPagination>
    );
};

export default Pagination;