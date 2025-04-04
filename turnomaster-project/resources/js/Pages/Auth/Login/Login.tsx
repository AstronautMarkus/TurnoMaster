import React, { useState } from "react";
import { FaEye, FaEyeLowVision, FaGift, FaGhost } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthLoadingScreen from "../../../Components/Auth/LoadingScreen/AuthLoadingScreen";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      const response = await axios.post("/api/login", {
        email: formData.username,
        password: formData.password,
      });
      setSuccessMessage(response.data.message);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Ocurrió un error inesperado");
      } else {
        setErrorMessage("Ocurrió un error inesperado");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-12 px-28 shadow-2xl w-full max-w-lg">
      <div className="flex items-center justify-center mb-6">
        <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-14 h-14 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Iniciar sesión</h2>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <AuthLoadingScreen />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Usuario o correo electrónico
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: john@doe.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          {errorMessage && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 text-sm text-green-600 text-center">
              {successMessage}
            </div>
          )}
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Iniciar sesión
          </button>
          <div className="mt-4 text-center flex items-center justify-center gap-2">
            <Link rel="stylesheet" to="/auth/forgot-password" className="text-sm text-red-600 hover:underline flex items-center gap-1">
              <FaGhost />
              Olvidé mi contraseña
            </Link>
          </div>
          <div className="mt-4 text-center flex items-center justify-center gap-2">
            <Link rel="stylesheet" to="/prices" className="text-sm text-green-600 hover:underline flex items-center gap-1">
              <FaGift />
              Prueba TurnoMaster gratis
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;