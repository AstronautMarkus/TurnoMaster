import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa6';
import LoadingScreen from '../../../../Components/LoadingScreen/LoadingScreen';
import axios from 'axios';

const CompaniesResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showInvalidTokenModal, setShowInvalidTokenModal] = useState(false);

  useEffect(() => {
    axios.get(`/api/validate-reset-token/company/${token}`)
      .then(response => {
        if (!response.data.valid) {
          setError('Token inválido o expirado.');
          setShowInvalidTokenModal(true);
        }
      })
      .catch(() => {
        setError('Error al verificar el token.');
        setShowInvalidTokenModal(true);
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
      const response = await axios.post('/api/reset-password/companies', {
        token,
        password,
        confirm_password: confirmPassword,
      });

      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 md:p-12 w-full max-w-md md:max-w-lg">
        {showInvalidTokenModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Token Inválido</h2>
              <p className="text-gray-700 mb-6">El token para restablecer la contraseña es inválido o ha expirado.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => navigate('/auth/login')}
                  className="px-4 py-2 bg-[#e01d1d] text-white hover:bg-[#b21e1e]"
                >
                  Ir a Login
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Ir al Inicio
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <img src="/img/logo/TurnoMasterRed.svg" alt="Logo" className="w-12 h-12 mr-3" />
              <h2 className="text-2xl font-semibold flex items-center">
                Restablecer contraseña
              </h2>
            </div>
            <div className="flex items-center justify-center mb-6">
              <span className="font-semibold">(Empresas)</span>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <LoadingScreen type="auth-reset-password" />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input type="hidden" value={token} />
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Ingrese una nueva contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
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
                  <label className="block mb-2 text-sm font-medium">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirme su contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
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
                  <div className="mb-4 text-m text-red-600 bg-red-100 border border-red-400 p-2 text-center">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="mb-4 text-m text-green-600 bg-green-100 border border-green-400 p-2 text-center">
                    {successMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white focus:outline-none focus:ring-2 focus:ring-[#e01d1d]"
                >
                  Restablecer Contraseña
                </button>
                <div className="mt-6 text-center">
                  <Link
                    to="/auth/login"
                    className="text-sm text-gray-600 hover:text-[#e01d1d] flex justify-center items-center gap-2"
                  >
                    <FaArrowLeft />
                    Volver al inicio de sesión
                  </Link>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompaniesResetPassword;
