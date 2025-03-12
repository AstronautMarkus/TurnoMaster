import React from 'react';
import { BsHouse, BsFolder, BsPerson } from "react-icons/bs";
import "./Sidebar.css";

class Sidebar extends React.Component {
    componentDidMount() {
        const expandableMenus = document.querySelectorAll('.expandable-menu > a');
        expandableMenus.forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.preventDefault();
                const content = menu.nextElementSibling;
                if (content) {
                    content.classList.toggle('show');
                }
            });
        });
    }

    render() {
        return (
            <div className="d-flex flex-column flex-shrink-0 text-white vh-100 sidebar" style={{ width: '280px' }}>
                <div className="sidebar-header p-3">
                    <a className="navbar-brand navbar-text font-weight-bold" href="/">
                        <img src="/img/logo/TurnoMaster_dashboard.svg" alt="TurnoMaster Logo" className="navbar-logo" id="navbar-logo"/>
                    </a>
                </div>
                <div className="sidebar-content p-3" style={{ overflowY: 'auto' }}>
                    <ul className="nav nav-pills flex-column mb-auto separator">
                        <li className="nav-item">
                            <a href="/" className="nav-link" aria-current="page">
                                <BsHouse />
                                Lorem Ipsum
                            </a>
                        </li>
                        <li className="nav-item expandable-menu">
                            <a href="#" className="nav-link">
                                <BsFolder />
                                Lorem Ipsum
                            </a>
                            <ul className="expandable-menu-content">
                                <li className="nav-item">
                                    <a href="/" className="nav-link">
                                    1. Lorem Ipsum
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/" className="nav-link">
                                    2. Lorem Ipsum
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                <BsPerson />
                                Lorem Ipsum
                            </a>
                        </li>
                    </ul>
                    <hr/>
                </div>
            </div>
        );
    }
}

export default Sidebar;