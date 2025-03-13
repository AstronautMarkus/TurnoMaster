import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import "./Navbar.css"

interface NavbarProps {
    toggleRightSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleRightSidebar }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggle = () => {
        if (isSidebarOpen) {
            toggleRightSidebar();
            setIsSidebarOpen(false);
        } else {
            toggleRightSidebar();
            setIsSidebarOpen(true);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light text-white w-100 navbar-custom">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className='mx-3'>
                        <div className="toggle-dropdown" onClick={handleToggle}>
                            {isSidebarOpen ? <FaAngleUp /> : <FaAngleDown />}
                        </div>                 
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;