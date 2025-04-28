import React, { useState } from 'react';
import axios from 'axios';

const CrearEmpleados = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role_id: '',
        company_name: '',
    });

    const [generatedPassword, setGeneratedPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        for (const key in formData) {
            if (!formData[key as keyof typeof formData]) {
                setError('Todos los campos son obligatorios.');
                return false;
            }
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Por favor, ingrese un correo válido.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('/api/create-employee', {
                name: formData.name,
                email: formData.email,
                company_name: formData.company_name, // Enviar company_name como string
            });
            setGeneratedPassword(response.data.user.temporary_password);
            setSuccess('Empleado registrado exitosamente. Se ha enviado un correo electrónico para activarlo.');
            setFormData({
                name: '',
                email: '',
                role_id: '',
                company_name: '',
            });
        } catch (error: any) {
            setError(error.response?.data?.message || 'Hubo un error al registrar al empleado.');
        }
    };

    return (
        <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-4xl mx-auto mt-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Registrar Nuevo Empleado</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-10">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <div className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role_id" className="block text-gray-700 font-medium mb-2">Rol</label>
                        <select
                            id="role_id"
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="2">Empleado</option> {/* Role ID 2 */}
                            <option value="3">R.R.H.H</option> {/* Role ID 3 */}
                            <option value="1">Propietario</option> {/* Role ID 1 */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="company_name" className="block text-gray-700 font-medium mb-2">Nombre de la Empresa</label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Registrar Empleado
                    </button>
                    {generatedPassword && (
                        <p className="text-green-500 text-center mt-4">
                            Contraseña generada: <strong>{generatedPassword}</strong>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CrearEmpleados;
