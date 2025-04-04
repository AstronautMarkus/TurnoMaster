import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaGift, FaUser, FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { useNavbarFeatures } from "./useNavbarFeatures";
import { LogoutModal } from "../../../Dashboard/Components/Navbar/UserNav/LogoutModal";
import { useHandleLogout } from "../../../../hooks/useHandleLogout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const features = useNavbarFeatures();

  const userData = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = !!userData;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = useHandleLogout();

  return (
    <nav className="bg-[#5C5AD6] shadow-lg py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/img/logo/TurnoMaster.svg" alt="" className="h-auto w-14" />
          <Link
            to="/"
            className="text-white text-3xl font-semibold hover:text-neutral-400 transition-colors duration-300"
          >
            TurnoMaster
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/prices"
            className="text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Precios
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-white text-lg hover:text-neutral-400 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Características <FaAngleDown className="ml-2" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border-2 border-[#5C5AD6]">
                <div className="py-1">
                  {features.map((feature) => (
                    <Link
                      key={feature.path}
                      to={feature.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-[#5C5AD6] hover:text-white transition-colors duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {feature.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link
            to="/clients"
            className="text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Clientes
          </Link>
          <Link
            to="/about-project"
            className="text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Sobre el proyecto
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Contacto
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                className="flex items-center text-white text-lg hover:text-neutral-400 transition-colors duration-300"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                {`Hola, ${userData.name}`} <FaAngleDown className="ml-2" />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border-2 border-[#5C5AD6]">
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-[#5C5AD6] hover:text-white transition-colors duration-300"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#5C5AD6] hover:text-white transition-colors duration-300"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        setIsLogoutModalOpen(true);
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/register-demo"
                className="flex items-center bg-[#F57424] hover:bg-[#db6821] text-white text-lg px-4 py-2 rounded-full transition-colors duration-300"
              >
                <FaGift className="mr-2" /> <span>Prueba Gratis</span>
              </Link>
              <Link
                className="flex items-center bg-[#377CE4] hover:bg-[#326fc9] text-white text-lg px-4 py-2 rounded-full transition-colors duration-300"
                to="/auth/login"
              >
                <FaUser className="mr-2" /> <span>Iniciar sesión</span>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4">
          <Link
            to="/prices"
            className="block py-2 text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Precios
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center w-full py-2 text-white text-lg hover:text-neutral-400 transition-colors duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Características <FaAngleDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-white rounded-md shadow-lg border-2 border-purple-800">
                <div className="py-1">
                  {features.map((feature) => (
                    <Link
                      key={feature.path}
                      to={feature.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {feature.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link
            to="/clients"
            className="block py-2 text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Clientes
          </Link>
          <Link
            to="/about-project"
            className="block py-2 text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Sobre el proyecto
          </Link>
          <Link
            to="/contact"
            className="text-white text-lg hover:text-neutral-400 transition-colors duration-300"
          >
            Contacto
          </Link>
          <div className="mt-4 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <div className="relative" ref={userDropdownRef}>
                  <button
                    className="flex items-center w-full py-2 text-white text-lg hover:text-neutral-400 transition-colors duration-300"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  >
                    {`Hola, ${userData.name}`} <FaAngleDown className="ml-2" />
                  </button>
                  {isUserDropdownOpen && (
                    <div className="mt-2 bg-white rounded-md shadow-lg border-2 border-purple-800">
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-100 transition-colors duration-300"
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            setIsLogoutModalOpen(true);
                          }}
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  className="flex items-center bg-[#F57424] hover:bg-[#db6821] text-white text-lg px-4 py-2 rounded-full transition-colors duration-300"
                  to="/auth/register-demo"
                >
                  <FaGift className="mr-2" /> <span>Prueba Gratis</span>
                </Link>
                <Link
                  className="flex items-center bg-[#377CE4] hover:bg-[#326fc9] text-white text-lg px-4 py-2 rounded-full transition-colors duration-300"
                  to="/auth/login"
                >
                  <FaUser className="mr-2" /> <span>Iniciar sesión</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => handleLogout(() => setIsLogoutModalOpen(false))}
      />
    </nav>
  );
}

