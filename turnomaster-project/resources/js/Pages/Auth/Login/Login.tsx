import React, { useState } from "react";
import AuthLayout from "../../../Layouts/Auth/AuthLayout";
import { FaEye, FaEyeLowVision } from "react-icons/fa6";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <AuthLayout title="Login">
      <div className="bg-white rounded-lg p-12 shadow-lg w-full max-w-md">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/img/logo/TurnoMaster.svg"/>
          </div>
          <h2 className="ml-4 text-2xl font-bold text-gray-800">Iniciar sesión</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block mb-3 text-sm font-medium text-gray-700">
              Usuario o correo electrónico
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: john@doe.com"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block mb-3 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeLowVision /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;