import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa6';
import AuthLoadingScreen from '../../../Components/Auth/LoadingScreen/AuthLoadingScreen';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/validate-reset-token/${token}`)
      .then(response => {
        if (!response.data.valid) {
          setError('Token inválido o expirado.');
        }
      })
      .catch(() => {
        setError('Error al verificar el token.');
      });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');
    setPasswordError('');
    setConfirmPasswordError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', {
        token,
        password,
        confirm_password: confirmPassword,
      });

      if (response.data.message) {
        setSuccessMessage(response.data.message);
      } else {
        throw new Error('Ocurrió un error al actualizar la contraseña.');
      }
    } catch (err: any) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};
        setPasswordError(errors.password || '');
        setConfirmPasswordError(errors.confirm_password || '');
      } else {
        setError(err.response?.data?.message || 'Ocurrió un error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-sm md:max-w-lg mx-auto mt-10">
      <div className="flex items-center justify-center mb-6">
        <img src="/img/logo/TurnoMaster.svg" alt="Logo" className="w-14 h-14 mr-4" />
        <h2 className="text-2xl font-bold text-gray-800">Restablecer contraseña</h2>
      </div>

      {isLoading ? (
        <AuthLoadingScreen />
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={token} />

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingrese una nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme su contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>
            )}
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
            Restablecer Contraseña
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

export default ResetPassword;
