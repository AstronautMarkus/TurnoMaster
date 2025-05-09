import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBuilding } from 'react-icons/fa6';
import AuthLoadingScreen from '../../../../Components/Auth/LoadingScreen/AuthLoadingScreen';
import axios from 'axios';

const CompaniesForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/forgot-password/companies', { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess(response.data.message);
      }
    } catch (err: any) {
      if (err.response?.status === 422) {
        setError(err.response.data.errors.email);
      } else if (err.response?.status === 404) {
        setError(err.response.data.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 md:p-12 w-full max-w-md md:max-w-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <img src="/img/logo/TurnoMasterRed.svg" alt="Logo" className="w-12 h-12 mr-3" />
                <h2 className="text-2xl font-semibold flex items-center">
                Olvidé mi contraseña
                </h2>
            </div>
            <div className="flex items-center justify-center mb-6">
              <FaBuilding className="mr-2" />
              <h2 className="font-semibold">(Empresas)</h2>
            </div>
            {isLoading ? (
              <AuthLoadingScreen />
            ) : (
              <>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-m text-center">
                Ingresa tu correo electrónico, recibirás un correo con instrucciones para restablecer tu contraseña.
                </label>
                <input
                type="email"
                id="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                required
                />
              </div>

              {error && (
                <div className="mb-4 text-center text-m text-red-600 bg-red-100 border border-red-400 rounded p-2">
                {error}
                </div>
              )}
              {success && (
                <div className="mb-4 text-center text-m text-green-600 bg-green-100 border border-green-400 rounded p-2">
                {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#e01d1d]"
              >
                Enviar correo de recuperación
              </button>

              <div className="mt-6 text-center">
                <Link
                to="/auth/login/companies"
                className="text-sm text-gray-600 hover:text-black flex justify-center items-center gap-2"
                >
                <FaArrowLeft />
                Volver al inicio de sesión
                </Link>
              </div>
              </>
            )}
          </form>
      </div>
    </div>
  );
};

export default CompaniesForgotPassword;
