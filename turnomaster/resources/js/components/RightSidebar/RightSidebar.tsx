import React from 'react';

const RightSidebar: React.FC = () => {
    return (
        <div id="rightSidebar" className="right-sidebar">

        <div className="sidebar-header">
            <img src="{{ asset('img/headers/header01.png') }}" alt="cabecera" class="background-img" oncontextmenu="return false;"/>
            <div className="profile-bg">
                <img src="{{ asset('img/utils/profile-picture.png') }}" alt="perfil" class="profile-img" oncontextmenu="return false;"/>
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