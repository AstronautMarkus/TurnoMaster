import React from "react";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaHeadset,
  FaLaptopCode,
  FaHome,
  FaTag,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="bg-[#111111] text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">

          <div className="flex flex-col mb-6">
          <div className="flex items-center space-x-3">
            <img src="/img/logo/TurnoMasterWhite.svg" alt="Logo" className="h-auto w-14" />
            <Link to="/" className="text-white text-3xl font-semibold hover:underline transition-colors duration-300">
            TurnoMaster
            </Link>
          </div>
          </div>

          <div className="border-t border-gray-700 mb-8"></div>

          <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col md:flex-row gap-8">
            <div className="space-y-3 md:w-1/2">
            <h3 className="text-xl font-semibold text-white">Recursos</h3>
            <ul className="space-y-2">
              <li>
              <Link to="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaBook className="text-sm" />
                <span>Documentación</span>
              </Link>
              </li>
              <li>
              <Link to="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaHeadset className="text-sm" />
                <span>Soporte</span>
              </Link>
              </li>
              <li>
              <Link to="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaLaptopCode className="text-sm" />
                <span>Tutoriales</span>
              </Link>
              </li>
            </ul>
            </div>
            <div className="space-y-3 md:w-1/2">
            <h3 className="text-xl font-semibold text-white">Acceso rápido</h3>
            <ul className="space-y-2">
              <li>
              <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaHome className="text-sm" />
                <span>Inicio</span>
              </Link>
              </li>
              <li>
              <Link to="/prices" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaTag className="text-sm" />
                <span>Precios</span>
              </Link>
              </li>
              <li>
              <Link to="/about-project" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaInfoCircle className="text-sm" />
                <span>Sobre el proyecto</span>
              </Link>
              </li>
              <li>
              <Link to="/contact" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <FaEnvelope className="text-sm" />
                <span>Contacto</span>
              </Link>
              </li>
            </ul>
            </div>
          </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-6">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {"TurnoMaster"}. Todos los derechos reservados. creado por 
            <a href="https://www.reyesandfriends.cl" target="_blank" className="inline-flex items-center ml-1"> <img  src="/img/logo/reyesandfriends.svg"  alt="reyesandfriends.cl" className="mx-2 h-7" /></a>
            .
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;