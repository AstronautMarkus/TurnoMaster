import useRegisterDemo from "../../../hooks/auth/RegisterDemo/useRegisterDemo"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RegisterDemo = () => {
  const {
    formData,
    errors,
    apiMessage,
    isLoading,
    handleChange,
    handleSubmit,
    step,
    nextStep,
    prevStep,
    showSummary,
    editStep,
    success,
  } = useRegisterDemo()


  const navigate = useNavigate ? useNavigate() : null

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = "Si recargas o sales de esta página, se perderán los datos ingresados en el formulario."
      return e.returnValue
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 md:p-12 w-full max-w-md md:max-w-lg shadow-lg relative border-2 border-gray-300 shadow-md">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <img src="/img/logo/TurnoMasterRed.svg" alt="Logo" className="w-12 h-12 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Registro de Cuenta Demo</h1>
          </div>
          <p className="text-gray-600 text-center mb-2">
            Para probar nuestro sistema, por favor complete el siguiente formulario.
          </p>
          <h2 className="font-semibold text-gray-600 text-center text-sm lg:text-base mt-1">
            {showSummary ? "Resumen de Registro" : step === 1 ? "Información Personal" : "Datos del Sistema"}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          {!showSummary ? (
            <form className="w-full" onSubmit={e => e.preventDefault()}>
              {step === 1 && (
                <>
                  <div className="mb-4">
                    <label htmlFor="first_name" className="block mb-2 text-m font-medium text-black">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                      placeholder="Ingrese su nombre"
                    />
                    {errors?.first_name && (
                      <p className="text-m text-red-600 text-center">
                        {errors.first_name[0]}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="last_name" className="block mb-2 text-m font-medium text-black">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                      placeholder="Ingrese su apellido"
                    />
                    {errors?.last_name && (
                      <p className="text-m text-red-600 text-center">
                        {errors.last_name[0]}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="rut" className="block mb-2 text-m font-medium text-black">
                      RUT *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        id="rut"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                        placeholder="Ingrese su RUT sin puntos ni guión"
                      />
                      <input
                        type="text"
                        id="rut_dv"
                        name="rut_dv"
                        value={formData.rut_dv}
                        onChange={handleChange}
                        maxLength={1}
                        className="w-16 px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d] text-center"
                        placeholder="DV"
                      />
                    </div>
                    {errors?.rut && (
                      <p className="text-m text-red-600 text-center">
                        {errors.rut[0]}
                      </p>
                    )}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-m font-medium black">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                      placeholder="Ingrese su correo electrónico"
                    />
                    {errors?.email && (
                      <p className="text-m text-red-600 text-center">
                        {errors.email[0]}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="company_name" className="block mb-2 text-m font-medium text-black">
                      Nombre de la Empresa *
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                      placeholder="Ingrese el nombre de su empresa"
                    />
                    {errors?.company_name && (
                      <p className="text-m text-red-600 text-center">
                        {errors.company_name[0]}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={prevStep}
                  >
                    Anterior
                  </button>
                )}
                <div className="flex-1" />
                <button
                  type="button"
                  className="px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white focus:outline-none focus:ring-2 focus:ring-[#e01d1d]"
                  onClick={nextStep}
                >
                  {step === 2 ? "Ver Resumen" : "Siguiente"}
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-20">
                  <span className="flex items-center justify-center mb-3">
                    <span className="dot-animate bg-[#e01d1d] rounded-full w-2 h-2 mx-1 inline-block"></span>
                    <span className="dot-animate bg-[#e01d1d] rounded-full w-2 h-2 mx-1 inline-block" style={{ animationDelay: "0.2s" }}></span>
                    <span className="dot-animate bg-[#e01d1d] rounded-full w-2 h-2 mx-1 inline-block" style={{ animationDelay: "0.4s" }}></span>
                    <style>
                      {`
                        .dot-animate {
                          opacity: 0.3;
                          animation: dotBlink 1s infinite;
                        }
                        @keyframes dotBlink {
                          0%, 80%, 100% { opacity: 0.3; }
                          40% { opacity: 1; }
                        }
                      `}
                    </style>
                  </span>
                  <span className="text-[#e01d1d] font-semibold">Registrando usuario...</span>
                </div>
              )}
              <div className={isLoading ? "pointer-events-none opacity-60" : ""}>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">Información Personal</h3>
                  <div className="flex justify-between items-center">
                    <span>Nombre:</span>
                    <span>{formData.first_name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Apellido:</span>
                    <span>{formData.last_name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>RUT:</span>
                    <span>
                      {formData.rut}-{formData.rut_dv}
                    </span>
                  </div>
                  {!success && (
                    <button
                      className="text-blue-600 underline mt-2 text-sm"
                      onClick={() => editStep(1)}
                      disabled={isLoading}
                    >
                      Editar
                    </button>
                  )}
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">Datos del Sistema</h3>
                  <div className="flex justify-between items-center">
                    <span>Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Empresa:</span>
                    <span>{formData.company_name}</span>
                  </div>
                  {!success && (
                    <button
                      className="text-blue-600 underline mt-2 text-sm"
                      onClick={() => editStep(2)}
                      disabled={isLoading}
                    >
                      Editar
                    </button>
                  )}
                </div>
                {apiMessage && (
                  <div
                    className={`text-m ${
                      success
                        ? "text-green-600 bg-green-100 border border-green-400"
                        : "text-red-600 bg-red-100 border border-red-400"
                    } p-2 mb-4`}
                  >
                    <div>{apiMessage}</div>
                    {!success && errors && Object.keys(errors).length > 0 && (
                        <ul className="list-disc list-inside mt-2 text-sm">
                        {errors &&
                          Object.keys(errors).map(field =>
                          (errors[field] || []).map((msg, idx) => (
                            <li key={field + idx}>
                            <span className="font-semibold">{field}:</span> {msg}
                            </li>
                          ))
                          )}
                        </ul>
                    )}
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  {!success ? (
                    <>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                        onClick={prevStep}
                        disabled={success || isLoading}
                      >
                        Anterior
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white focus:outline-none focus:ring-2 focus:ring-[#e01d1d]"
                        onClick={handleSubmit}
                        disabled={isLoading || success}
                      >
                        Registrar cuenta Demo
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white focus:outline-none focus:ring-2 focus:ring-[#e01d1d] w-full"
                      onClick={() => {
                        if (navigate) {
                          navigate("/")
                        } else {
                          window.location.href = "/"
                        }
                      }}
                    >
                      Volver a Home
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegisterDemo

