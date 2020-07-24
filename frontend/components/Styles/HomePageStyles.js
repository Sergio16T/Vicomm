import styled from 'styled-components';

const StyledBanner = styled.div`
    width: 100%; 
    background-position: top right;
    background-repeat: no-repeat;
    height: 525px; 
    background-size: cover;
    background-image: url("https://data.world/wp-content/uploads/2020/07/Group-237_afd3271a081cc8819c7005ad83e37873.png");
    display: flex; 
    overflow: hidden; 
    img {
        align-self: center; 
        height: 370px;
        margin: 1.5rem 1rem 1.5rem auto; 
    }
    .bannerColumn {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        margin: 0 4rem; 
        flex: 0 0 48%; 
        max-width: 48%;
        padding: 1rem;  
        h1 {
            color: white; 
            font-size: 3.4rem; 
            font-weight: 700; 
            margin-top: 0; 
        }
    }
    @media (max-width: 1000px) {
        height: calc(100vh - 70px); 
        flex-direction: column; 
        .bannerColumn {
            align-items: flex-start; 
            margin: 1rem 4rem;  
            order: 2;
            flex: 100%; 
            max-width: 100%; 
            text-align: center; 
            h1 {
                font-size: 2.8rem; 
            }
        }
        img {
            margin: 100px auto 2rem auto; 
            order: 1; 
            height: 320px; 
        }
    }
`; 
const Main = styled.div`
    width: 100%; 
    margin-top:70px; 
`; 
const Section = styled.div`
    width: 100%; 
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
            font-size: 1.4rem; 
            text-transform: uppercase; 
        }
    }
    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr; 
        grid-row-gap: 20px; 
    }
`; 
export { StyledBanner, Main, Section}; 