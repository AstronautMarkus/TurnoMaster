import type React from "react"
import AuthLoadingScreen from "../../../Components/Auth/LoadingScreen/AuthLoadingScreen"
import useRegisterDemo from "../../../hooks/auth/registerDemo/useRegisterDemo"

const RegisterDemo: React.FC = () => {
  const {
    formData,
    errors,
    apiMessage,
    isLoading,
    handleChange,
    handleSubmit,
    isValidDV, // Import isValidDV from the hook
  } = useRegisterDemo()

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 md:p-12 w-full max-w-md md:max-w-lg shadow-lg">
        <div className="flex items-center justify-center">
          <img src="/img/logo/TurnoMasterRed.svg" alt="Logo" className="w-12 h-12 mr-3" />
          <h2 className="font-bold text-gray-800 text-center lg:text-2xl">Utiliza nuestra Demo gratuita</h2>
        </div>
        {isLoading ? (
          <AuthLoadingScreen />
        ) : (
          <div className="flex flex-col items-center">

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label htmlFor="first_name" className="block mb-2 text-m font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                  placeholder="Ingrese su nombre"
                  
                />
                {errors?.first_name && ( 
                  <p className="text-m text-red-600 text-center">
                    {errors.first_name[0]}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="block mb-2 text-m font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                  placeholder="Ingrese su apellido"
                  
                />
                {errors?.last_name && ( 
                  <p className="text-m text-red-600 text-center">
                    {errors.last_name[0]}
                  </p>
                )}
              </div>
                <div className="mb-4">
                <label htmlFor="rut" className="block mb-2 text-m font-medium text-gray-700">
                  RUT
                </label>
                <div className="flex space-x-2">
                  <input
                  type="text"
                  id="rut"
                  name="rut"
                  value={formData.rut}
                  onChange={(e) => {
                    handleChange(e)

                    if (errors.rut && isValidDV(e.target.value, formData.rut_dv)) {
                      delete errors.rut
                    }
                  }}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                  placeholder="Ingrese su RUT sin puntos ni guión"
                  />
                    <input
                    type="text"
                    id="rut_dv"
                    name="rut_dv"
                    value={formData.rut_dv}
                    onChange={(e) => {
                      handleChange(e)

                      if (errors.rut && isValidDV(formData.rut, e.target.value)) {
                        delete errors.rut
                      }
                    }}
                    maxLength={1}
                    className="w-16 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d] text-center"
                    placeholder="DV"
                    />
                </div>
                {errors?.rut && ( 
                  <p className="text-m text-red-600 text-center">
                  {errors.rut[0]}
                  </p>
                )}
                </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-m font-medium text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                  placeholder="Ingrese su correo electrónico"
                  
                />
                {errors?.email && ( 
                  <p className="text-m text-red-600 text-center">
                    {errors.email[0]}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="company_name" className="block mb-2 text-m font-medium text-gray-700">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                  placeholder="Ingrese el nombre de su empresa"
                  
                />
                {errors?.company_name && ( 
                  <p className="text-m text-red-600 text-center">
                    {errors.company_name[0]}
                  </p>
                )}
              </div>

              {apiMessage && (
                <p
                  className={`text-m ${
                    apiMessage === "El RUT ya ha sido registrado."
                      ? "text-red-600 bg-red-100 border border-red-400"
                      : "text-green-600 bg-green-100 border border-green-400"
                  } rounded p-2 mb-4`}
                >
                  {apiMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d]"
              >
                Registrar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegisterDemo

