import React from 'react';
import "./Navbar.css"

interface NavbarProps {
    toggleRightSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleRightSidebar }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light text-white w-100 navbar-custom">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <span className="navbar-text text-white mx-2">
                        ¡Hola, "user"!
                    </span>
                    <div className="dropdown">
                        <a className="dropdown-toggle" role="button" id="toggleRightSidebar" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </a>    
                    </div>
                    <button onClick={toggleRightSidebar} className="btn btn-link text-white">
                        <i className="fas fa-bars"></i> Toggle Right Sidebar
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;