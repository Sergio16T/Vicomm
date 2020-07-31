import styled from 'styled-components'; 

const MenuAppContainer = styled.div`
    height: 100%; 
    width: 100%;
    position: relative;  
    .Nav {
        width: 100%; 
        height: calc(100% - 70px); 
        position:relative; 
        img { 
            width: 140px; 
            height: 50px; 
            margin: auto;
            margin:  1rem 1.4rem; 
        }
        .nav-list-container {
            width: 100%; 
            height: 100%; 
            padding-top: 1rem; 
            ul {
                margin: 0;
                padding: 0; 
                .app-list-item {
                    list-style: none; 
                    display: flex; 
                    align-items: center; 
                    padding: .5rem; 
                    font-size: 1.3rem; 
                    color: rgba(0,0,0,0.4);
                    position: relative; 
                    overflow: hidden; 
                    .faIcon {
                        border-radius: 50%;
                        width: 32px;
                        height: 32px;
                        margin: 0 1rem;
                        color: ${props => props.theme.offWhite}; 
                        background: #4285f4;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    &:hover {
                        cursor: pointer; 
                        background: ${props => props.theme.lightgrey};
                    }
                    &:after {
                        content: "";
                        display: block;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        pointer-events: none;
                        background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
                        background-repeat: no-repeat;
                        background-position: 50%;
                        transform: scale(10,10);
                        opacity: 0;
                        transition: transform .5s, opacity 1s;
                    }
                    &:active:after {
                        transform: scale(0,0);
                        opacity: .2;
                        transition: 0s;
                    }
                }
            }
        }
    }
    .navMenuAccount_Data {
        width: 100%; 
        position: absolute; 
        bottom: 0; 
        left: 0; 
        height: 70px; 
        border-top: 1px solid rgba(0,0,0,0.1); 
        display: flex; 
        padding: 0 1rem; 
        align-items: center; 
        font-size: 1.3rem; 
        box-sizing: border-box; 
        .userInitials {
            position: relative; 
            background: #221b43; 
            width: 34px ;
            height: 34px; 
            border-radius: 50%; 
            margin: 0 .5rem; 
            color: white; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
        }
        .user-name {
            margin: .5rem; 
            color: rgba(0,0,0,0.4); 
        }
    }
`; 
const Side = styled.div`
    width: 210px; 
    height: 100%; 
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);  
    z-index: 110; 
    position: fixed; 
    top: 0; 
    /* background: rgba(0, 0, 0, 0.02); */
    background: ${props => props.theme.offWhite};
    margin-bottom: 90px; 
    @media (max-width: 800px) {
        transform: ${props => props.isOpen ? "translateX(0)" : "translateX(-100%)" };
        transition: all 0.3s;
    }
`; 

export { Side, MenuAppContainer }; 