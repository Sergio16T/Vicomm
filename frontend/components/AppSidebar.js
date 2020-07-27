import React, { useState } from 'react'; 
import styled from 'styled-components';

const MenuAppContainer = styled.div`
    height: 100%; 
    width: 100%;
    position: relative;  
    .Nav {
        width: 100%; 
        height: calc(100% - 70px); 
        img { 
            width: 140px; 
            margin: auto;
            margin:  1rem 1.4rem; 
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
    z-index: 100; 
    position: fixed; 
    top: 0; 
    background: rgba(0, 0, 0, 0.02);
    margin-bottom: 90px; 

`; 
const SideBar = (props) => {
    const [open, setOpen] = useState(false); 
    const { user } = props; 
    return (
        <Side>
            <MenuAppContainer>
                <div className="Nav">
                    <img id="logo" src="https://res.cloudinary.com/dddnhychw/image/upload/v1595569683/Full%20Stack%20App/Logo_W__Title_4_evli4d.svg"/>
                </div>
                <div className="navMenuAccount_Data">
                    <span className="userInitials">{`${user.FST_NAME.slice(0, 1)}${user.LST_NAME.slice(0, 1)}`}</span>
                    <span className="user-name">{`${user.FST_NAME} ${user.LST_NAME}`}</span>
                </div>
            </MenuAppContainer>
        </Side>
    )
}

const StyledHeader = styled.div`
    width: 100%; 
    margin-left: 210px;  
    height: 80px; 
    position: fixed; 
`; 
const AppHeader = (props) => {
    return (
        <StyledHeader>

        </StyledHeader>
    ); 
}
export { SideBar, AppHeader }; 