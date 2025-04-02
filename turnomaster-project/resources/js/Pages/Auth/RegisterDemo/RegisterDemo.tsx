"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6"
import AuthLoadingScreen from "../../../Components/Auth/LoadingScreen/AuthLoadingScreen"

const RegisterDemo: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company_name: "" })
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})
  const [apiMessage, setApiMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post("/api/create-demo-user", formData)
      setErrors({})
      setApiMessage(response.data.message)
      setFormData({ name: "", email: "", company_name: "" })
      console.log("User Created:", response.data)
    } catch (error: any) {
      if (error.response.status === 422) {
        const newErrors = error.response.data.errors
        setErrors(newErrors)

        const updatedFormData = { ...formData }
        Object.keys(newErrors).forEach((field) => {
          updatedFormData[field as keyof typeof formData] = ""
        })
        setFormData(updatedFormData)
      } else if (error.response.status === 400) {
        setErrors({ company_name: [error.response.data.message] })
        console.log("Company Info:", error.response.data.company)
      } else {
        setApiMessage("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto lg:flex lg:space-x-8">
      <div className="bg-white rounded-xl p-8 shadow-2xl w-full lg:w-auto lg:flex-1">
        <div className="flex flex-col items-center justify-center mb-6">
          <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-16 h-16 mb-3" />
          <h2 className="font-bold text-gray-800 text-center text-2xl lg:text-3xl">Empieza a utilizar TurnoMaster!</h2>
          <p className="text-gray-600 text-center mt-2 text-sm lg:text-base">
            {isLoading
              ? "Procesando tu solicitud, lo mejor está por venir..."
              : "Gracias por interesarte! Rellena el formulario para usar una prueba gratuita de 7 días."}
          </p>
        </div>
        {isLoading ? (
          <AuthLoadingScreen />
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
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Registrar
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="hidden lg:block bg-white rounded-xl p-8 shadow-2xl lg:flex-1">
        <div className="bg-gray-100 p-6 rounded-lg h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Compruebe todo el poder de TurnoMaster en una prueba gratuita de 7 días.</h3>
            <ul className="text-gray-600 text-sm list-disc list-inside">
            <li>No necesitas agregar datos de una tarjeta para su uso.</li>
            <li>Prueba gratuita de 7 días.</li>
            <li>A diferencia de nuestro <strong>Modelo Fremium</strong>, aquí puedes probar todas las funciones del sistema sin limitaciones.</li>
            <li>Prueba el acceso total de las funciones de TurnoMaster por tiempo limitado.</li>
            <li>La prueba gratis no es funcional para entornos de producción.</li>
            </ul>
            <div className="mt-6 border-t border-gray-300 pt-6 flex flex-col lg:flex-row lg:space-x-4">
              <div className="flex-1 text-center">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Paso 1</h4>
                <p className="text-gray-600 text-xs">Rellena el formulario con tus datos personales y de tu empresa.</p>
              </div>
              <div className="flex-1 text-center">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Paso 2</h4>
                <p className="text-gray-600 text-xs">Revisa tu correo electrónico para confirmar tu registro.</p>
              </div>
              <div className="flex-1 text-center">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Paso 3</h4>
                <p className="text-gray-600 text-xs">Accede a tu cuenta y comienza a explorar TurnoMaster.</p>
              </div>
            </div>

        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={toggleModal}
          className="px-4 py-2 text-white bg-[#F57424] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Más Información
        </button>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✕
            </button>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Compruebe todo el poder de TurnoMaster en una prueba gratuita de 7 días.
            </h3>
            <ul className="text-gray-600 text-xs list-disc list-inside space-y-2">
              <li>No necesitas agregar datos de una tarjeta para su uso.</li>
              <li>Prueba gratuita de 7 días.</li>
              <li>A diferencia de nuestro <strong>Modelo Fremium</strong>, aquí puedes probar todas las funciones del sistema sin limitaciones.</li>
              <li>Prueba el acceso total de las funciones de TurnoMaster por tiempo limitado.</li>
              <li>La prueba gratis no es funcional para entornos de producción.</li>
            </ul>
            <div className="mt-6 border-t border-gray-300 pt-6">
              <div className="flex flex-col space-y-6">
                <div className="flex-1 text-center">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Paso 1</h4>
                  <p className="text-gray-600 text-xs">Rellena el formulario con tus datos personales y de tu empresa.</p>
                </div>
                <div className="flex-1 text-center">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Paso 2</h4>
                  <p className="text-gray-600 text-xs">Revisa tu correo electrónico para confirmar tu registro.</p>
                </div>
                <div className="flex-1 text-center">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Paso 3</h4>
                  <p className="text-gray-600 text-xs">Accede a tu cuenta y comienza a explorar TurnoMaster.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterDemo

