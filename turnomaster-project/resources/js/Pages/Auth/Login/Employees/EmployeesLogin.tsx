import React from "react";
import { FaEye, FaEyeLowVision, FaGift, FaGhost } from "react-icons/fa6";
import { Link } from "react-router-dom";

const EmployeesLogin: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-sm md:max-w-lg">
      <div className="flex items-center justify-center mb-6">
        <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-14 h-14 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Iniciar sesión (Empleados)</h2>
      </div>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
            Usuario o correo electrónico
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: john@doe.com"
            disabled
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su contraseña"
              disabled
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              disabled
            >
              <FaEyeLowVision />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        >
          Iniciar sesión
        </button>
        <div className="mt-4 text-center flex items-center justify-center gap-2">
          <Link rel="stylesheet" to="/auth/forgot-password" className="text-sm text-red-600 hover:underline flex items-center gap-1">
            <FaGhost />
            Olvidé mi contraseña
          </Link>
        </div>
        <div className="mt-4 text-center flex items-center justify-center gap-2">
          <a rel="stylesheet" href="/prices" className="text-sm text-green-600 hover:underline flex items-center gap-1">
            <FaGift />
            Prueba TurnoMaster gratis
          </a>
        </div>
      </form>
    </div>
  );
};

export default EmployeesLogin;
