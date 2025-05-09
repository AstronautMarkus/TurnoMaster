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
  FaMapMarkerAlt,
  FaPhone,
  FaGlobeAmericas,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">{"TurnoMaster"}</h3>
        <p className="text-gray-400">{"El software ideal para gestionar las entradas y salidas de tu negocio de manera eficiente y profesional."}</p>
        <div className="flex space-x-4 pt-2">
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
          <FaPhone className="text-xl" />
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
          <FaEnvelope className="text-xl" />
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
          <FaMapMarkerAlt className="text-xl" />
          </Link>
        </div>
        </div>

        <div className="space-y-3">
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
          <Link to="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"></Link>
            <FaLaptopCode className="text-sm" />
            <span>Tutoriales</span>
          </li>
        </ul>
        </div>

        <div className="space-y-3">
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

      <div className="border-t border-gray-700 my-10"></div>

      <div className="text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} {"TurnoMaster"}. Todos los derechos reservados. creado por 
          <a href="https://www.reyesandfriends.cl" target="_blank" className="inline-flex items-center ml-1">
            <img 
              src="/img/logo/reyesandfriends.svg" 
              alt="reyesandfriends.cl" 
              className="mx-2 h-7" 
            />
          </a>
          .
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;