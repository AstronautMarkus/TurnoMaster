import React, { useState } from "react";
import { FaBuilding, FaEye, FaEyeLowVision} from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthLoadingScreen from "../../../../Components/Auth/LoadingScreen/AuthLoadingScreen";

const CompaniesLogin: React.FC = () => {
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
      axios.defaults.withCredentials = true;

      const response = await axios.post("/api/login-companies", {
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
        const errorMessageFromBackend = error.response?.data?.message || "Ocurrió un error inesperado";
        const errorUrl = error.response?.data?.url;

        setErrorMessage(
          errorUrl ? (
            <>
              {errorMessageFromBackend}{" "}
              <br />
              <a href={errorUrl} target="_blank" className="font-bold text-blue-800" rel="noopener noreferrer">
                Acceder a la página de suscripciones y precios
              </a>
            </>
          ) : (
            errorMessageFromBackend
          )
        );
      } else {
        setErrorMessage("Ocurrió un error inesperado");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="bg-white p-8 md:p-12 w-full max-w-md md:max-w-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <img src="/img/logo/TurnoMasterRed.svg" alt="Logo" className="w-12 h-12 mr-3" />
            <h2 className="text-2xl font-semibold flex items-center">
            Iniciar sesión <span className="ml-2"><FaBuilding /></span> (Empresas)
            </h2>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <AuthLoadingScreen />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm font-medium">
                Correo electrónico
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                  Contraseña
                </label>
                <Link to="/auth/forgot-password" className="text-sm hover:underline">
                  Olvidé mi contraseña
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPassword ? <FaEyeLowVision /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mb-4 text-center">
              {errorMessage && (
                <div className="text-m text-red-600 bg-red-100 border border-red-400 rounded p-2">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="text-m text-green-600 bg-green-100 border border-green-400 rounded p-2">
                  {successMessage}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d]"
            >
              Iniciar sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompaniesLogin;
