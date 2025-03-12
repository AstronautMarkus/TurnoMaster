import React from 'react';
import "./RightSidebar.css";

interface RightSidebarProps {
    isOpen: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen }) => {
    return (
        <div id="rightSidebar" className={`right-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <img src="/img/headers/header01.png" alt="cabecera" className="background-img" onContextMenu={(e) => e.preventDefault()}/>
                <div className="profile-bg">
                    <img src="/img/utils/profile-picture.png" alt="perfil" className="profile-img" onContextMenu={(e) => e.preventDefault()}/>
                </div>
                <h3>Your name</h3>
            </div>
            <div className="right-sidebar-content">
                <ul className="sidebar-options">
                    <li>
                        <a href="#">Opción 1 interesante</a>
                    </li>
                    <li>
                        <a href="#">Opción 2 interesante</a>
                    </li>
                    <li>
                        <a href="#">Opción 3 interesante</a>
                    </li>
                </ul>
                <div className="logout-btn">
                    <button type="button" className="text-danger" data-toggle="modal" data-target="#logoutModal">Cerrar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;