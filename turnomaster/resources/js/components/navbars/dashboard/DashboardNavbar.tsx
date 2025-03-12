import React from 'react';
import styles from "./DashboardNavbar.module.css"

class DashboardNavbar {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light text-white w-100 navbar-custom">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <span class="navbar-text text-white mx-2">
                            ¡Hola, "user"!
                        </span>
                        <div class="dropdown">
                            <a class="dropdown-toggle" role="button" id="toggleRightSidebar" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="navbar-toggler-icon"></span>
                            </a>    
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default DashboardNavbar;