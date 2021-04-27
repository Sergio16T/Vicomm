import styled from 'styled-components';

const HomePage = styled.div`
    height: calc(100% - 75px);
    background: rgba(0,0,0,0.02);
`;

const StyledBanner = styled.div`
    width: 100%;
    background-position: top right;
    background-repeat: no-repeat;
    height: 75vh;
    background-size: cover;
    display: flex;
    overflow: hidden;
    .bannerColumn {
        width: 100%;
        text-align: center;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        color: rgb(38, 50, 56);
        h1 {
            font-size: 4.4rem;
            font-weight: 800;
            margin: 6rem 0 .5rem 0;
        }
        p {
            font-size: 2rem;
            font-weight: 300;
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
        width: 770px;
        height: 770px;
        position: absolute;
        background: ${props => props.theme.purple};
        bottom: -400px;
        right: -280px;
        border-radius: 50%;
        display: flex;
        img {
            align-self: flex-start;
            transform: translateX(40px) translateY(-40px);
            z-index: 12;
        }
    }
    .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        padding-top: 2rem;
        transform: translateY(40px);
        #mobile-img {
            z-index: 12;
            width: 210px;
            transform: translateX(40px) translateY(-50px);
        }
        img {
            z-index: 10;
            width: 700px;
            display: flex;
            align-self: center;
            transform: translateX(-10px);
            box-shadow: 1px 1px 4px 1px rgb(51 51 51 / 20%);
        }
    }
    @media (max-width: 1780px) {
        .purpleSphere {
            img {
                transform: translateX(40px) translateY(20px);
            }
        }
    }
    @media (max-width: 1100px) {
        .blueSphere, .purpleSphere {
            width: 600px;
            height: 600px;
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
    @media (max-width: 1000px) {
        .bannerColumn {
            padding: 0 2rem;
            h1 {
                font-size: 3.4rem;
            }
            p {
                font-size: 1.8rem;
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
        .img-container {
            padding-top: 0;
            #mobile-img {
                width: 180px;
            }
            img {
                width: 700px;
                transform: translateX(-20px);
            }
        }
    }
    @media (max-width: 650px) {
        height: 60vh;
        .bannerColumn {
            padding: 0 2rem;
            h1 {
                font-size: 2.4rem;
            }
            p {
                font-size: 1.4rem;
            }
        }
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
        .img-container {
            padding-top: 0;
            #mobile-img {
                width: 120px;
            }
            img {
                width: 400px;
                transform: translateX(-20px);
            }
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
    background-color: white;
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
    .cardIcon {
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
export { HomePage, StyledBanner, Main, Section };