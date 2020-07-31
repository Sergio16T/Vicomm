import React, { useState } from 'react'; 
import { Side, MenuAppContainer } from './Styles/AppSidebarStyles'; 
import Link from 'next/link'; 

const SideBar = (props) => {
    const [open, setOpen] = useState(false); 
    const { user } = props; 
    return (
        <Side isOpen={props.isOpen}>
            <MenuAppContainer>
                <div className="Nav">
                    <div>
                        <img id="logo" src="https://res.cloudinary.com/dddnhychw/image/upload/v1595569683/Full%20Stack%20App/Logo_W__Title_4_evli4d.svg"/>
                    </div>
                    <div className="nav-list-container">
                        <ul id="app-sidebar-list">
                            <Link href="/dashboard">
                                <li className="app-list-item">
                                    <span className="faIcon">
                                        <i className="fa fa-home"></i>
                                    </span>
                                   
                                    <span>Home</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                
                <div className="navMenuAccount_Data">
                    <span className="userInitials">{`${user.FST_NAME.slice(0, 1)}${user.LST_NAME.slice(0, 1)}`}</span>
                    <span className="user-name">{`${user.FST_NAME} ${user.LST_NAME}`}</span>
                </div>
            </MenuAppContainer>
        </Side>
    )
}


export default SideBar ; 