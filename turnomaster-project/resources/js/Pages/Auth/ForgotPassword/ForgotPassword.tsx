import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import AuthLoadingScreen from '../../../Components/Auth/LoadingScreen/AuthLoadingScreen';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
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
      const response = await axios.post('/api/forgot-password', { email }, {
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
    <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-sm md:max-w-lg mx-auto mt-10">
      {isLoading ? (
        <div className="text-center text-gray-700"><AuthLoadingScreen /></div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-6">
            <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-14 h-14 mr-4" />
            <h2 className="text-2xl font-bold text-gray-800">Recuperar contraseña</h2>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Ingresa tu correo electronico asosiado a una cuenta en TurnoMaster
            </label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
          )}
          {success && (
            <p className="mb-4 text-sm text-green-600 text-center">{success}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar correo de recuperación
          </button>

          <div className="mt-6 text-center">
            <Link
              to="/auth/login"
              className="text-sm text-gray-600 hover:text-blue-700 flex justify-center items-center gap-2"
            >
              <FaArrowLeft />
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
