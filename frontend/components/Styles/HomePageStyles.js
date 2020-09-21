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
        overflow: hidden;
        position: relative; 
        h1 {
            font-size: 4.4rem;
            font-weight: 700; 
            margin: 8rem 0 3rem 0; 
        }
        p {
            font-size: 1.8rem; 
        }
    }
    .blueSphere {
        width: 750px; 
        height: 750px; 
        position: absolute; 
        background: ${props => props.theme.skyBlue}; 
        bottom: -400px; 
        left: -400px; 
        border-radius: 50%; 
    }
    .purpleSphere {
        width: 750px; 
        height: 750px; 
        position: absolute; 
        background: ${props => props.theme.purple}; 
        bottom: -400px; 
        right: -400px; 
        border-radius: 50%; 
    }
    @media (max-width: 1000px) {
        height: calc(100vh - 70px); 
        .bannerColumn {
            padding: 0 2rem; 
            h1 {
                font-size: 2.8rem; 
                margin: 6rem 0 2rem 0; 
            }
        }
        .blueSphere, .purpleSphere {
            width: 640px; 
            height: 640px; 
        }
        .blueSphere {
            bottom: -300px; 
            left: -300px; 
        }
        .purpleSphere {
            bottom: -340px;
            right: -340px; 
        }
    }
    @media (max-width: 650px) {
        .blueSphere, .purpleSphere {
            width: 540px; 
            height: 540px; 
        }
        .blueSphere {
            bottom: -260px; 
            left: -260px; 
        }
        .purpleSphere {
            bottom: -280px;
            right: -280px; 
        }
    }
    @media (max-width: 480px) {
        .blueSphere, .purpleSphere {
            width: 440px; 
            height: 440px; 
        }
        .blueSphere {
            bottom: -140px; 
            left: -240px; 
        }
        .purpleSphere {
            bottom: -200px;
            right: -280px; 
        }
    }
    @media (max-width: 380px) {
        .blueSphere {
            bottom: -220px; 
            left: -280px; 
        }
        .purpleSphere {
            bottom: -280px;
            right: -310px; 
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
    /* border-bottom: 1px solid #f5f5f5;  */
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