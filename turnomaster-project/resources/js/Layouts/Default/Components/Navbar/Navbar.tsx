import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaGift,
  FaUser,
  FaAngleUp,
  FaAngleDown,
  FaBuilding,
  FaUserTie,
} from "react-icons/fa6";
import { useNavbarFeatures } from "./useNavbarFeatures";
import { LogoutModal } from "../../../Dashboard/Components/Navbar/UserNav/LogoutModal";
import { useHandleLogout } from "../../../../hooks/useHandleLogout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAccessDropdownOpen, setIsAccessDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const accessDropdownRef = useRef<HTMLDivElement>(null);

  const features = useNavbarFeatures();
  const handleLogout = useHandleLogout();

  const userData = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = !!userData;
  const userImage = userData?.profile_photo || "/img/profile/default.png";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target))
        setIsDropdownOpen(false);
      if (userDropdownRef.current && !userDropdownRef.current.contains(target))
        setIsUserDropdownOpen(false);
      if (accessDropdownRef.current && !accessDropdownRef.current.contains(target))
        setIsAccessDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderLink = (to: string, label: string) => (
    <Link
      to={to}
      className="text-white text-lg hover:underline transition-colors duration-300 block py-2 md:py-0"
    >
      {label}
    </Link>
  );

  const renderDropdownItems = (items: { path: string; name: string }[]) => (
    <div className="py-1">
      {items.map((feature) => (
        <Link
          key={feature.path}
          to={feature.path}
          className="block px-4 py-2 text-gray-800 hover:bg-[#891818] hover:text-white transition-colors duration-300"
          onClick={() => setIsDropdownOpen(false)}
        >
          {feature.name}
        </Link>
      ))}
    </div>
  );

  const renderAccessButton = () => (
    <div className="relative" ref={accessDropdownRef}>
      <button
        onClick={() => setIsAccessDropdownOpen(!isAccessDropdownOpen)}
        className="flex items-center text-white text-lg px-4 py-2 rounded-full border border-white transition-colors hover:bg-white hover:text-black w-full md:w-auto"
      >
        <FaUser className="mr-2" />
        <span>Acceder</span>
        <FaAngleDown className="ml-2" />
      </button>
      {isAccessDropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border-2 border-[#891818]">
          <div className="py-1">
            <Link
              to="/auth/login/companies"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#891818] hover:text-white transition-colors duration-300"
            >
              <FaBuilding className="mr-2" /> <span>Empresas</span>
            </Link>
            <Link
              to="/auth/login/employees"
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-[#891818] hover:text-white transition-colors duration-300"
            >
              <FaUserTie className="mr-2" /> <span>Empleados</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  const renderUserDropdown = () => (
    <div className="relative" ref={userDropdownRef}>
      <button
        className="flex items-center space-x-2 text-white text-lg  w-full md:w-auto hover:underline"
        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
      >
        <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-600">
          <img src={userImage} alt="Profile" className="h-full w-full object-cover" />
        </div>
        <span className="font-medium">{`${userData.name}`}</span>
        <FaAngleDown className="ml-1" />
      </button>
      {isUserDropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border-2 border-[#891818]">
          <div className="py-1">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-800 hover:bg-[#891818] hover:text-white transition-colors duration-300"
              onClick={() => setIsUserDropdownOpen(false)}
            >
              Dashboard
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#891818] hover:text-white transition-colors duration-300"
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
  );

  return (
    <nav className="bg-[#891818] shadow-lg py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center space-x-2">
          <img src="/img/logo/TurnoMasterWhite.svg" alt="Logo" className="h-auto w-14" />
          <Link to="/" className="text-white text-3xl font-semibold hover:underline transition-colors duration-300">
            TurnoMaster
          </Link>
        </div>


        <div className="hidden md:flex items-center space-x-8">
          {renderLink("/prices", "Precios")}

          {renderLink("/about-project", "Sobre el proyecto")}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-white text-lg hover:underline transition-colors duration-300"
            >
              Características <FaAngleDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border-2 border-[#891818]">
                {renderDropdownItems(features)}
              </div>
            )}
          </div>

          {renderLink("/contact", "Contacto")}
        </div>


        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            renderUserDropdown()
          ) : (
            <>
              <Link
                to="/auth/register-demo"
                className="flex items-center text-white text-lg px-4 py-2 rounded-full border border-white transition-colors hover:bg-white hover:text-black"
              >
                <FaGift className="mr-2" /> <span>Prueba Gratis</span>
              </Link>
              {renderAccessButton()}
            </>
          )}
        </div>


        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {renderLink("/prices", "Precios")}
          {renderLink("/about-project", "Sobre el proyecto")}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center w-full py-2 text-white text-lg hover:underline transition-colors duration-300"
            >
              Características <FaAngleDown className="ml-2" />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 w-full bg-white rounded-md shadow-lg border-2 border-[#891818]">
                {renderDropdownItems(features)}
              </div>
            )}
          </div>
          
          {renderLink("/contact", "Contacto")}

          {isAuthenticated ? (
            renderUserDropdown()
          ) : (
            <>
              <Link
                to="/auth/register-demo"
                className="flex items-center text-white text-lg px-4 py-2 rounded-full border border-white transition-colors hover:bg-white hover:text-black"
              >
                <FaGift className="mr-2" /> <span>Prueba Gratis</span>
              </Link>
              {renderAccessButton()}
            </>
          )}
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
