import React from "react";
import { FaBuilding, FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DefaultLogin: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="bg-white p-8 md:p-12 w-full max-w-md md:max-w-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <img src="/img/logo/TurnoMasterRed.svg" alt="Logo" className="w-12 h-12 mr-3" />
          <h2 className="text-2xl font-semibold flex items-center">
            Acceder a la plataforma
          </h2>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Selecciona el tipo de usuario:
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/auth/login/employees"
              className="flex flex-col items-center justify-center p-6 border shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              <FaUserTie className="text-4xl mb-2" />
              <span className="font-medium">Empleados</span>
            </Link>
            <Link
              to="/auth/login/companies"
              className="flex flex-col items-center justify-center p-6 border shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              <FaBuilding className="text-4xl mb-2" />
              <span className="font-medium">Empresas</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLogin;