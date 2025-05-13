import React from "react";
import { FaBuilding, FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AuthErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="bg-white p-8 md:p-12 w-full max-w-md md:max-w-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <img src="/img/logo/TurnoMasterRed.svg" alt="Logo" className="w-12 h-12 mr-3" />
          <h2 className="text-2xl font-semibold flex items-center">
            Error
          </h2>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">
            La página que estás buscando no existe o no tienes acceso a ella.
          </h3>
          <div className="flex justify-center">
            <Link
              to="/"
              className="w-full px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] text-center"
            >
              Volver a inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;