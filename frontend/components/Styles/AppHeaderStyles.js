import styled from 'styled-components'; 

const StyledHeader = styled.div`
width: calc(100% - 210px);
box-shadow: 0px 4px 3px -3px rgba(0, 0, 0, 0.2);  
box-sizing: border-box;  
margin-left: 210px;  
height: 80px; 
position: fixed; 
background-color: #4285f4; 
display: flex; 
align-items: center; 
padding: 0 2rem; 
.nav-left{ 
    display: flex; 
    flex: 0 0 50%; 
    max-width: 50%; 
    text-align: left; 
    flex-direction: row; 
    #hamburger {
        display: none; 
    }
    #userName {
        font-size: 1.4rem; 
        color:white; 
        text-transform: uppercase; 
    }
}
.nav-right {
    flex: 0 0 50%; 
    max-width: 50%; 
    text-align: right; 
    display: flex; 
    justify-content: flex-end; 
    align-items: center; 
}
#uploadImageIcon {
    /* filter: invert(0%) sepia(96%) saturate(0%) hue-rotate(196deg) brightness(105%) contrast(103%); */
    width: 95px; 
    height: 95px; 
    margin-right: .5rem; 
    &:hover {
        cursor: pointer; 
    }
}
@media (max-width: 800px) {
    width: 100%; 
    margin-left: 0; 
    .nav-left {
        #hamburger {
            display: block; 
            align-self: center; 
            z-index: 4;
            margin-right: 2rem; 
            cursor: pointer; 
            & div {
                background-color: white;
                width: 17px; 
                height: 2px; 
                margin-top: 4px; 
            }
        }
    }
}
`; 

const StyledMenu = styled.div`
    display: flex; 
    flex-direction: column; 
    width: 40px; 
    height: 55px; 
    justify-content: center; 
    align-items: center; 
    margin: 0 .5rem; 
    .dot {
        height: 5px;
        width: 5px;
        margin: 1.5px;
        background-color: white;
        border: none;
        border-radius: 50%;
        opacity: .7;  
    }
    &:hover {
            cursor: pointer; 
        }
`; 

const SubMenu = styled.div`
    position: fixed; 
    transform-origin: right top; 
    transform: ${props => props.isOpen ? "scale(1)" : "scale(0)"}; 
    opacity: ${props => props.isOpen ? 1 : 0}; 
    overflow: hidden; 
    width: 172px; 
    box-shadow: ${props => props.theme.bs}; 
    background: ${props => props.theme.offWhite}; 
    top: 12px; 
    right: 10px; 
    border-radius: 6px; 
    transition: all .4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 600ms; 
    display: flex; 
    flex-direction: column; 
    padding: ${props => props.isOpen ? "1rem 0" : "0"}; 
    box-sizing: border-box; 
    height: 110px; 
    span {
        overflow: hidden; 
        text-align: left; 
        &:hover {
            background: #f1eded;
        }
        .logOutBtn {
            opacity: ${props => props.isOpen ? 1 : 0}; 
            transition: all .2s cubic-bezier(0.25, 0.8, 0.25, 1);
            text-align: left; 
            width: 100%; 
            padding: 1.2rem; 
            border:none; 
            background: transparent; 
            outline: none; 
            font-size: 1.3rem;
            position: relative; 
            overflow: hidden; 
            &:hover {
                cursor: pointer; 
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
`;

export { StyledHeader, StyledMenu, SubMenu }; 