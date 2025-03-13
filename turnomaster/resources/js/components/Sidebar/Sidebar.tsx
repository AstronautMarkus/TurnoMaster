import React from 'react';
import { BsHouse, BsFolder, BsPerson } from "react-icons/bs";
import "./Sidebar.css";
import { Link } from 'react-router-dom';

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
                    <Link className="navbar-brand navbar-text font-weight-bold" to="/dashboard/">
                        <img src="/img/logo/TurnoMaster_dashboard.svg" alt="TurnoMaster Logo" className="navbar-logo" id="navbar-logo"/>
                    </Link>
                </div>
                <div className="sidebar-content p-3" style={{ overflowY: 'auto' }}>
                    <ul className="nav nav-pills flex-column mb-auto separator">
                        <li className="nav-item">
                            <Link to="/dashboard/test1" className="nav-link" aria-current="page">
                                <BsHouse />
                                Test 1
                            </Link>
                        </li>
                        <li className="nav-item expandable-menu">
                            <Link to="#" className="nav-link">
                                <BsFolder />
                                Open folder
                            </Link>
                            <ul className="expandable-menu-content">
                                <li className="nav-item">
                                    <Link to="/dashboard/test2" className="nav-link">
                                    1. Lorem Ipsum
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard/test3" className="nav-link">
                                    2. Lorem Ipsum
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/example" className="nav-link">
                                <BsPerson />
                                Lorem Ipsum
                            </Link>
                        </li>
                    </ul>
                    <hr/>
                </div>
            </div>
        );
    }
}

export default Sidebar;