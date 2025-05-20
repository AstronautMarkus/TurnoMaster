import type React from "react";
import { useState } from "react";
import ExitModal from "./ExitModal/ExitModal";
import { FiLogOut } from "react-icons/fi";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showExitModal, setShowExitModal] = useState(false);

  const handleExit = () => setShowExitModal(true);
  const handleCloseModal = () => setShowExitModal(false);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-500">
      <button className="absolute top-4 left-4 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow transition" onClick={handleExit} aria-label="Salir">
        <FiLogOut className="h-6 w-6 text-gray-700" />
      </button>

      {showExitModal && (
        <ExitModal
          onConfirm={() => {
            window.location.href = "/";
          }}
          onCancel={handleCloseModal}
        />
      )}
      
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/img/backgrounds/kate-sade-2zZp12ChxhU-unsplash.jpg')] brightness-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

