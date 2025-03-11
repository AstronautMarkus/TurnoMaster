import React from 'react';
import styles from "./MainFooter"

class MainFooter extends React.Component {
    getCurrentYear(): number {
        return new Date().getFullYear();
    }

    render() {
        return (
            <footer className="bg-dark text-white pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h5>TurnoMaster</h5>
                            <p>Proporcionando soluciones sencillas y eficientes para su negocio.</p>
                        </div>
                        <div className="col-md-3">
                            <h5>Recursos</h5>
                            <ul className="list-unstyled">
                                <li><a className="text-white disabled">Documentación</a></li>
                                <li><a className="text-white disabled">Referencia API</a></li>
                                <li><a className="text-white disabled">Soporte</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>Acceso Rápido</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Inicio</a></li>
                                <li><a href="#" className="text-white">Precios</a></li>
                                <li><a href="#" className="text-white">Acerca de</a></li>
                                <li><a href="#" className="text-white">Contacto</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>Contáctenos</h5>
                            <p>Email: info@turnomaster.com</p>
                            <p>Teléfono: +123 456 7890</p>
                            <h5>Síguenos</h5>
                            <div className="social-icons">
                                <a href="#" className="text-white me-2"><i className="fab fa-facebook"></i></a>
                                <a href="#" className="text-white me-2"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="text-white me-2"><i className="fab fa-linkedin"></i></a>
                                <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="text-center py-3">
                        <p>&copy; {this.getCurrentYear()} TurnoMaster. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default MainFooter;