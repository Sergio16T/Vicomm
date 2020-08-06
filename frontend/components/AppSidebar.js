import React, { useState } from 'react'; 
import { Side, MenuAppContainer } from './Styles/AppSidebarStyles'; 
import Link from 'next/link'; 

const SideBar = (props) => {
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
                            <MenuItem
                            link="/dashboard"
                            id="homeIcon"
                            faIcon="fa fa-home"
                            text="Home"
                            />
                            <MenuItem
                            link="/dashboard"
                            id="productIcon"
                            faIcon="fas fa-tag"
                            text="Products"
                            />
                            <MenuItem
                            link="/dashboard"
                            id="ordersIcon"
                            faIcon="fas fa-shopping-cart"
                            text="Orders"
                            />
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

const MenuItem = (props) => {
    return (
        <Link href={props.link}>
        <li className="app-list-item">
            <span className="faIcon" id={props.id}>
                <i className={props.faIcon}></i>
            </span>
            <span>{props.text}</span>
        </li>
    </Link>
    )
}

export default SideBar ; 