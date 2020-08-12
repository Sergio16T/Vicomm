import styled from 'styled-components';

const HomePage = styled.div`
    height: calc(100% - 75px); 
`; 
const StyledBanner = styled.div`
    width: 100%; 
    background-position: top right;
    background-repeat: no-repeat;
    height: 525px; 
    background-size: cover;
    display: flex; 
    overflow: hidden; 
    background: rgba(0,0,0,0.02); 
    .bannerColumn {
        width: 100%; 
        text-align: center; 
        h1 {
            font-size: 4.4rem;
            font-weight: 700; 
            margin: 8rem 0 3rem 0; 
        }
        p {
            font-size: 1.8rem; 
        }
    }
    @media (max-width: 1000px) {
        height: calc(100vh - 70px); 
        .bannerColumn {
            margin: 0 2rem; 
            h1 {
                font-size: 2.8rem; 
                margin: 6rem 0 2rem 0; 
            }
        }
    }
`; 
const Main = styled.div`
    width: 100%; 
    padding-top:70px; 
`; 
const Section = styled.div`
    width: 100%; 
    border-top: 1px solid #f5f5f5;; 
    border-bottom: 1px solid #f5f5f5; 
    padding: 2rem 0; 
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    .shopIcon {
        color: #8268FC; 
        font-size: 4rem; 
    }
    .videoIcon {
        color: #EB3569; 
        font-size: 4rem; 
    }
    .contentIcon {
        color: #3BD2A2; 
        font-size: 4rem; 
    }
    .businessIcon {
        color: #3BD2A2; 
        font-size: 4rem; 
    }
    .chartLineIcon {
        color: #4FD0E3; 
        font-size: 4rem; 
    }
    .sectionColumn {
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        p {
            font-size: 1.3rem; 
            text-transform: uppercase; 
        }
    }
    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        .sectionColumn {
            padding: 1rem 0; 
        }
    }
    @media (max-width: 480px) {
        grid-template-columns: 1fr; 
        .sectionColumn {
            flex-direction: row; 
            border-bottom: 1px solid #f5f5f5; 
            p {
                padding-left: 1rem; 
            }
            .faIcon {
                font-size: 3rem; 
            }
            &:last-child {
                border-bottom: none; 
            }
        }
    }
`; 
export { HomePage, StyledBanner, Main, Section}; 