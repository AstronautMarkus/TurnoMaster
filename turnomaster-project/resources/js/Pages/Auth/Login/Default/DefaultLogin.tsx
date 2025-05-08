import React from "react";

import { FaBuilding, FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DefalutLogin: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-sm md:max-w-lg">
      <div className="flex items-center justify-center mb-6">
        <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-14 h-14 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Acceder a la plataforma</h2>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Selecciona el tipo de usuario:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/auth/login/employees"
            className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            <FaUserTie className="text-4xl text-gray-600 mb-2" />
            <span className="text-gray-800 font-medium">Empleados</span>
          </Link>
          <Link
            to="/auth/login/companies"
            className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            <FaBuilding className="text-4xl text-gray-600 mb-2" />
            <span className="text-gray-800 font-medium">Empresas</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DefalutLogin;