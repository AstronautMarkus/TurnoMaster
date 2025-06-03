import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { FiLogOut, FiSettings, FiUser, FiMenu } from "react-icons/fi";
import { FaUserShield, FaUser } from 'react-icons/fa';
import { FaUserGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { LogoutModal } from "./LogoutModal";
import { useHandleLogout } from "../../../../../hooks/useHandleLogout";
import axios from "axios";

export function UserNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const handleLogout = useHandleLogout();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/me", {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
      .then(res => setUserData(res.data))
      .catch(() => setUserData(null));
  }, []);

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

  const userName = userData
    ? `${userData.user.first_name} ${userData.user.last_name}`
    : "Usuario";
  const userEmail = userData?.user?.email || "email@ejemplo.com";
  const userImage =
    userData?.user?.profile_photo ||
    "/img/profile/default.png";
  const userRoleId = userData?.role?.id;

  
  let RoleIcon = FaUser;
  if (userRoleId === 1) {
    RoleIcon = FaUserShield;
  } else if (userRoleId === 2) {
    RoleIcon = FaUserGear;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-600">
          <img
            src={userImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="hidden text-sm font-medium md:inline-block flex items-center gap-1">
          
          <RoleIcon className="inline-block mr-1" />
          {userName}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
            
            <div className="border-t border-gray-200"></div>
            
            <div className="py-1">
              <Link to="/dashboard/settings/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiUser className="mr-2 h-4 w-4 text-gray-500" /> Perfil
              </Link>
              <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <FiSettings className="mr-2 h-4 w-4 text-gray-500" /> Ajustes
              </Link>
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