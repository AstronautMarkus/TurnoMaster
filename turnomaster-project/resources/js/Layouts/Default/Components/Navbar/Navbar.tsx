import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGift, FaUser, FaAngleUp, FaAngleDown } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#6c5ce7] shadow-lg py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/img/logo/TurnoMaster.svg" alt="" className="h-10 w-auto" />
          <Link to="/" className="text-white text-2xl font-semibold hover:text-neutral-400 transition-colors duration-300">
            TurnoMaster
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/precios" className="text-white hover:text-neutral-400 transition-colors duration-300">
            Precios
          </Link>
          <div className="relative">
            <button
              className="flex items-center text-white hover:text-neutral-400 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Características
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <div className="py-1">
                  <Link to="/feature1" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300">
                    Característica 1
                  </Link>
                  <Link to="/feature2" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300">
                    Característica 2
                  </Link>
                  <Link to="/feature3" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300">
                    Característica 3
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link to="/clientes" className="text-white hover:text-neutral-400 transition-colors duration-300">
            Clientes
          </Link>
          <Link to="/proyecto" className="text-white hover:text-neutral-400 transition-colors duration-300">
            Sobre el proyecto
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center bg-[#ff7f50] hover:bg-[#ff6b3d] text-white px-4 py-2 rounded-full transition-colors duration-300">
            <FaGift className="mr-2" /> <span>Prueba Gratis</span>
          </button>
          <button className="flex items-center bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 rounded-full transition-colors duration-300">
            <FaUser className="mr-2" /> <span>Iniciar sesión</span>
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4">
          <Link to="/precios" className="block py-2 text-white hover:text-neutral-400 transition-colors duration-300">
            Precios
          </Link>
          <button
            className="flex items-center w-full py-2 text-white hover:text-neutral-400 transition-colors duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Características
          </button>
          {isDropdownOpen && (
            <div className="mt-2 bg-white rounded-md shadow-lg">
              <div className="py-1">
                <Link to="/feature1" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300">
                  Característica 1
                </Link>
                <Link to="/feature2" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300">
                  Característica 2
                </Link>
                <Link to="/feature3" className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300">
                  Característica 3
                </Link>
              </div>
            </div>
          )}
          <Link to="/clientes" className="block py-2 text-white hover:text-neutral-400 transition-colors duration-300">
            Clientes
          </Link>
          <Link to="/proyecto" className="block py-2 text-white hover:text-neutral-400 transition-colors duration-300">
            Sobre el proyecto
          </Link>
          <div className="mt-4 flex flex-col space-y-2">
          <button className="flex items-center bg-[#ff7f50] hover:bg-[#ff6b3d] text-white px-4 py-2 rounded-full transition-colors duration-300">
            <FaGift className="mr-2" /> <span>Prueba Gratis</span>
            </button>
            <button className="flex items-center bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 rounded-full transition-colors duration-300">
                <FaUser className="mr-2" /> <span>Iniciar sesión</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

