import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { FiLogOut, FiSettings, FiUser,  FiMenu} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { LogoutModal } from "./LogoutModal";
import { useHandleLogout } from "../../../../../hooks/useHandleLogout";

export function UserNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const handleLogout = useHandleLogout();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Usuario";
  const userEmail = user.email || "email@ejemplo.com";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-600">
          <img
            src="/img/default/default.jpg"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="hidden text-sm font-medium md:inline-block">
          {userName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
            
            <div className="border-t border-gray-200"></div>
            
            <div className="py-1">
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => e.preventDefault()}>
                <FiUser className="mr-2 h-4 w-4 text-gray-500" /> Perfil
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => e.preventDefault()}>
                <FiSettings className="mr-2 h-4 w-4 text-gray-500" /> Ajustes
              </a>
              <Link to="/" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiMenu className="mr-2 h-4 w-4 text-gray-500" /> Volver a inicio
              </Link>
            </div>
            
            <div className="border-t border-gray-200"></div>
            
            <div className="py-1">
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => { e.preventDefault(); setShowLogoutModal(true); }}>
                <FiLogOut className="mr-2 h-4 w-4 text-gray-500" /> Cerrar sesión
              </a>
            </div>
          </div>
        </div>
      )}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => handleLogout()}
      />
    </div>
  );
}