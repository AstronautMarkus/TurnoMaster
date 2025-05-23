import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useEditEmployee from './useEditEmployee';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {FaEdit} from 'react-icons/fa';

const EditEmployee: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { formValues, errors, handleChange, handleSubmit } = useEditEmployee();
    const [rut, setRut] = useState('');
    const [rutDv, setRutDv] = useState('');
    const [roles, setRoles] = useState<{ id: string, name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const rolesResponse = await axios.get('/api/roles', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRoles(rolesResponse.data);
            } catch (err) {
                setError('Error al cargar los roles. Por favor, intente más tarde.');
            } finally {
                setLoading(false);
            }
        };

        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const employee = response.data;
                handleChange('first_name', employee.first_name);
                handleChange('last_name', employee.last_name);
                handleChange('rut', employee.rut, true); 
                handleChange('rut_dv', employee.rut_dv, true); 
                handleChange('email', employee.email);
                handleChange('role_id', employee.role_id.toString());

                const rolesResponse = await axios.get('/api/roles', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const combinedRoles = [
                    { id: employee.role_id.toString(), name: employee.role },
                    ...rolesResponse.data.filter((role: { id: string }) => role.id.toString() !== employee.role_id.toString()),
                ];
                setRoles(combinedRoles);

                setRut(employee.rut);
                setRutDv(employee.rut_dv);
            } catch (err) {
                setError('Error al cargar los datos del empleado. Por favor, intente más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
        fetchEmployee();
    }, [id]);

    const handleRutChange = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '').slice(0, 8);
        setRut(numericValue);
        handleChange('rut', numericValue);
    };

    const handleRutDvChange = (value: string) => {
        const validValue = value.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 1);
        setRutDv(validValue);
        handleChange('rut_dv', validValue);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 flex items-center gap-2">
                <FaEdit />
                Editar empleado
            </h1>
            <div className="bg-white shadow-md w-full p-6 relative">
                <>
                    {submissionMessage && (
                        <div
                            className={`p-4 mb-4 text-sm ${
                                submissionMessage.type === 'success' ? 'text-black bg-green-400' : 'text-red-600 bg-red-100'
                            }`}
                        >
                            {submissionMessage.message}
                        </div>
                    )}
                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-600 bg-red-100">
                            {error}
                        </div>
                    )}
                    <form
                        className="space-y-4"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            const result = await handleSubmit(id); // Pass the employee ID
                            setLoading(false);
                            if (result?.type === 'success' || result?.type === 'error') {
                                setSubmissionMessage({ type: result.type, message: result.message });
                            }
                        }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-bold text-black">Nombre</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formValues.first_name}
                                    onChange={(e) => handleChange('first_name', e.target.value)}
                                    placeholder="Ingrese un nombre"
                                    className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-reyes focus:border-reyes hover:border-reyes"
                                    disabled={loading}
                                />
                                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-bold text-black">Apellido</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formValues.last_name}
                                    onChange={(e) => handleChange('last_name', e.target.value)}
                                    placeholder="Ingrese un apellido"
                                    className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-reyes focus:border-reyes hover:border-reyes"
                                    disabled={loading}
                                />
                                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                            </div>
                            <div>
                                <label htmlFor="rut" className="block text-sm font-bold text-black">RUT</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        id="rut"
                                        name="rut"
                                        value={rut}
                                        onChange={(e) => handleRutChange(e.target.value)}
                                        className="flex-grow px-4 py-2 focus:outline-none focus:ring-3 focus:ring-reyes focus:border-reyes hover:border-reyes"
                                        placeholder="12345678"
                                        disabled={loading}
                                    />
                                    <span>-</span>
                                    <input
                                        type="text"
                                        id="rut_dv"
                                        name="rut_dv"
                                        value={rutDv}
                                        onChange={(e) => handleRutDvChange(e.target.value)}
                                        className="w-12 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-reyes focus:border-reyes hover:border-reyes"
                                        placeholder="k"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.rut_general && <p className="text-red-500 text-sm">{errors.rut_general}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-black">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    placeholder="Ingrese un correo electrónico"
                                    className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-reyes focus:border-reyes hover:border-reyes"
                                    disabled={loading}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="role_id" className="block text-sm font-bold text-black">Rol</label>
                                <select
                                    id="role_id"
                                    name="role_id"
                                    value={formValues.role_id}
                                    onChange={(e) => handleChange('role_id', e.target.value)}
                                    className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-reyes focus:border-reyes hover:border-reyes"
                                    disabled={loading}
                                >
                                    <option value="" disabled>Selecciona un rol</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                                {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`mt-4 px-4 py-2 text-white ${
                                loading
                                    ? error
                                        ? 'bg-reyes'
                                        : 'bg-gray-400'
                                    : 'bg-gray-600 hover:bg-gray-700'
                            } flex items-center justify-center `}
                            disabled={loading}
                        >
                            {!loading && !error && <FaEdit className="mr-2" />}
                            {loading ? (error ? 'Error' : 'Cargando...') : 'Editar empleado'}
                        </button>
                    </form>
                </>
            </div>
            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/employees" className="text-white px-4 py-2 bg-reyes hover:bg-reyes-active transition-colors">Salir</Link>
            </div>
        </div>
    );
};

export default EditEmployee;