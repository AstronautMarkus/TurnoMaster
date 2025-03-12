import React, { useState, useEffect } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import "./Navbar.css"

interface NavbarProps {
    toggleRightSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleRightSidebar }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        if (isSidebarOpen) {
            setTimeout(() => {
                toggleRightSidebar();
                setIsSidebarOpen(false);
                setIsAnimating(false);
            }, 300);
        } else {
            toggleRightSidebar();
            setIsSidebarOpen(true);
            setIsAnimating(false);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light text-white w-100 navbar-custom">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <span className="navbar-text text-white mx-2">
                        ¡Hola, "user"!
                    </span>
                    <div>
                        <div className="toggle-dropdown" onClick={handleToggle}> <FaAngleDown /> </div>                 
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;