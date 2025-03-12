import React, { useState, forwardRef, useImperativeHandle } from 'react';

const RightSidebar = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    const closeSidebar = () => {
        setIsVisible(false);
    };

    useImperativeHandle(ref, () => ({
        toggleSidebar,
        closeSidebar
    }));

    return (
        <div id="rightSidebar" className={`right-sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="sidebar-header">
                <img src="/img/headers/header01.png" alt="cabecera" className="background-img" onContextMenu={(e) => e.preventDefault()}/>
                <div className="profile-bg">
                    <img src="/img/utils/profile-picture.png" alt="perfil" className="profile-img" onContextMenu={(e) => e.preventDefault()}/>
                </div>
                <h3>Your name</h3>
                <button onClick={toggleSidebar} className="btn btn-link">
                    <i className="fas fa-bars"></i>
                </button>
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
});

export default RightSidebar;