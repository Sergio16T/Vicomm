import styled from 'styled-components';

const StyledTable = styled.div`
    height: 600px;
    box-sizing: border-box;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    width: 100%;
    background-color: white;
    border-radius: 4px;
    flex: 1 1 auto;
    position: relative;
    overflow-x: auto;
    .table {
        min-width: 650px;
    }
    & div {
        box-sizing: border-box;
    }
    .table-header {
        height: 49px;
        background-color: rgb(64 53 115 / 40%);
        width: 100%;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom: ${props => `1px solid ${props.theme.lightgray}`};
        display: flex;
        flex-direction: row;
    }
    .table-body {
        height: calc(100% - 98px);
    }
    .table-row {
        width: 100%;
        height: 50.2px;
        border-bottom: ${props => `1px solid ${props.theme.lightgray}`};
        display: flex;
        align-items: center;
        font-size: 1.1rem;
        cursor: pointer;
        &:last-of-type {
            border-bottom: ${props => props.rowCount === props.numberPerPage ? 0 : `1px solid ${props.theme.lightgray}`};
        }
    }
    .header-col {
        height: 100%;
        display: flex;
        align-items: center;
        text-transform: uppercase;
        font-weight: 600;
        color: rgba(0,0,0,.54);
        letter-spacing: .8px;
    }
    .d-flex {
        display: flex;
    }
    .justify-content-center {
        justify-content: center;
    }
    .px-2 {
        padding-right: 1rem;
        padding-left: 1rem;
    }
    .w-50 {
        width: 50px;
    }
    .w-80 {
        width: 80px;
    }
    .w-120 {
        width: 120px;
    }
    .w-200 {
        width: 200px;
    }
    .table-col-400 {
        width: 400px;
        overflow: hidden;
        padding: 0 23px;
    }
    .table-img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        overflow: hidden;
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    .table-footer {
        min-width: 650px;
        height: 49px;
        position: absolute;
        bottom: 0;
        padding: 1rem;
        width: 100%;
        display: flex;
        align-items: center;
        border-top: ${props => `1px solid ${props.theme.lightgray}`};
        div {
            margin-left: auto;
        }
    }
    @media (max-width: 1000px) {
        .table-footer {
            div {
                margin-left: 0;
            }
        }
    }
`;

export default StyledTable;