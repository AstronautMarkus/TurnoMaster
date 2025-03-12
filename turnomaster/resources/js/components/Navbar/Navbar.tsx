import React, { useState, useEffect } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import "./Navbar.css"

interface NavbarProps {
    toggleRightSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleRightSidebar }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        if (user.name) {
            setUserName(user.name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
        }
    }, []);

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
                    <span className="navbar-text text-white mx-2">
                        ¡Hola, {userName}!
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