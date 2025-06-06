import React, { useEffect, useState } from "react";
import AuthLoadingScreen from "../../../Components/Auth/LoadingScreen/AuthLoadingScreen";
import axios from "axios";

const Logout: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Cerrando sesión...");

  useEffect(() => {
    const logout = async () => {
      try {
        axios.defaults.withCredentials = true;

        const res = await axios.post("/api/logout");
        if (res.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("theme");
          sessionStorage.removeItem("sidebar-collapsed");

          setMessage("Sesión cerrada correctamente.");
          setStatus("success");

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          throw new Error("Respuesta inesperada");
        }
      } catch (error) {
        setMessage("Hubo un error al cerrar la sesión.");
        setStatus("error");

        setTimeout(() => {
          window.location.href = "/";
        }, 2500);
      }
    };

    logout();
  }, []);

  return (
    <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-sm md:max-w-lg">
      <div className="flex items-center justify-center mb-6">
        <img
          src="/img/logo/TurnoMaster.svg"
          alt="Logo"
          className="w-14 h-14 mr-4"
        />
        <h2 className="text-3xl font-bold text-gray-800">Cerrando sesión...</h2>
      </div>

      <div className="flex flex-col items-center justify-center h-40 gap-2 text-center">
        {status === "loading" && <AuthLoadingScreen />}
        {status !== "loading" && (
          <span
            className={`text-s font-medium ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Logout;
