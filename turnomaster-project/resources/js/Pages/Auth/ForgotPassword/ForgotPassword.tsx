import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Por favor, ingresa tu correo.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Correo inválido.');
      return;
    }

    setError('');
    setSuccessMessage('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');

    try {
      const response = await axios.post('/api/forgot-password', {
        email,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      setSuccessMessage(response.data.message);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Ocurrió un error inesperado.');
    }

  };

  return (
    <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-sm md:max-w-lg mx-auto mt-10">
      <div className="flex items-center justify-center mb-6">
        <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-14 h-14 mr-4" />
        <h2 className="text-2xl font-bold text-gray-800">Recuperar contraseña</h2>
      </div>
      <form onSubmit={handleSubmit}>
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
        {successMessage && (
          <p className="mb-4 text-sm text-green-600 text-center">{successMessage}</p>
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
    </div>
  );
};

export default ForgotPassword;
