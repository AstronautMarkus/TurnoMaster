import React, {useEffect, useState} from 'react';
import "./RightSidebar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

interface RightSidebarProps {
    isOpen: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen }) => {
    const [showModal, setShowModal] = React.useState(false);

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            window.location.href = '/';
        }
    };

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        if (user.name) {
            setUserName(user.name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
        }
        if (user.email) {
            setUserEmail(user.email);
        }
    }, []);

    return (
        <div id="rightSidebar" className={`right-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <img src="/img/headers/header01.png" alt="cabecera" className="background-img" onContextMenu={(e) => e.preventDefault()}/>
                <div className="profile-bg">
                    <img src="/img/utils/profile-picture.png" alt="perfil" className="profile-img" onContextMenu={(e) => e.preventDefault()}/>
                </div>
                <h3>{userName}</h3>
                <p>{userEmail}</p>
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
                    <button type="button" className="text-danger" onClick={() => setShowModal(true)}>Cerrar sesión</button>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Cerrar Sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Estás seguro de que quieres cerrar sesión?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default RightSidebar;