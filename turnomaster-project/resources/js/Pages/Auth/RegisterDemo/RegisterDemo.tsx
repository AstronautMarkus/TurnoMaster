import React, { useState } from "react";
import axios from "axios";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const RegisterDemo: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company_name: "" });
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/create-demo-user", formData);
      setErrors({});
      setApiMessage(response.data.message);
      console.log("User Created:", response.data);
    } catch (error: any) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else if (error.response.status === 400) {
        setApiMessage(error.response.data.message);
        console.log("Company Info:", error.response.data.company);
      } else {
        setApiMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-2xl w-full max-w-sm">
    <div className="flex flex-col items-center justify-center mb-6">
      <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-12 h-12 mb-3" />
      <h2 className="font-bold text-gray-800 text-center">Empieza a utilizar TurnoMaster!</h2>
      <p className="text-gray-600 text-center mt-2">
        Gracias por interesarte! rellena el formulario para usar una prueba gratuita de 7 días.
      </p>
    </div>
      {isLoading ? (
        <div className="text-center text-gray-700">Loading...</div>
      ) : (
        <div className="flex flex-col items-center">
          {apiMessage && !errors.name && !errors.email && !errors.company_name && (
            <p className="mb-4 text-sm text-center text-green-700">
              <FaRegCircleCheck className="inline mr-2" />
              {apiMessage}
            </p>
          )}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Nombre
              </label>
              <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: John Doe"
            required
              />
              {errors.name && (
            <p className="text-sm text-red-600 text-center">
              <FaRegCircleXmark className="inline mr-2" />
              {errors.name[0]}
            </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Correo Electrónico
              </label>
              <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: john@doe.com"
            required
              />
              {errors.email && (
            <p className="text-sm text-red-600 text-center">
              <FaRegCircleXmark className="inline mr-2" />
              {errors.email[0]}
            </p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-700">
            Nombre de la Empresa
              </label>
              <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: TurnoMaster Inc."
            required
              />
              {errors.company_name && (
            <p className="text-sm text-red-600 text-center">
              <FaRegCircleXmark className="inline mr-2" />
              {errors.company_name[0]}
            </p>
              )}
            </div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Registrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterDemo;
