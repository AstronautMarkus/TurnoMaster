import React, { useState } from 'react';
import "./Navbar.css"

interface NavbarProps {
    toggleRightSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleRightSidebar }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggle = () => {
        toggleRightSidebar();
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light text-white w-100 navbar-custom">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <span className="navbar-text text-white mx-2">
                        ¡Hola, "user"!
                    </span>
                    <div className="dropdown">
                        <a className={`dropdown-toggle ${isSidebarOpen ? 'clicked' : ''}`} role="button" id="toggleRightSidebar" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleToggle}>
                            <span className="navbar-toggler-icon"></span>
                        </a>    
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;