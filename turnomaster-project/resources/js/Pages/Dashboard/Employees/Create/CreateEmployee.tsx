import React, { useState, useEffect } from 'react';
import useCreateEmployee from './useCreateEmployee';
import { useGetRoles } from './useGetRoles';
import { Link } from 'react-router-dom';

const CreateEmployee: React.FC = () => {
    const { formValues, errors, handleChange, handleSubmit } = useCreateEmployee();
    const [rut, setRut] = useState('');
    const [rutDv, setRutDv] = useState('');
    const [roles, setRoles] = useState<{ id: string, name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const fetchedRoles = await useGetRoles();
                setRoles(fetchedRoles);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los roles. Por favor, intente más tarde.');
                setLoading(false);
            }
        };
        fetchRoles();
    }, []);

    const handleRutChange = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setRut(numericValue);
        handleChange('rut', numericValue);
    };

    const handleRutDvChange = (value: string) => {
        const validValue = value.replace(/[^0-9kK]/g, '').toUpperCase();
        setRutDv(validValue);
        handleChange('rut_dv', validValue);
    };

    if (loading) {
        return <div className="p-6">Cargando...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">Crear empleado</h1>
            <form
                className="bg-white shadow-md w-full p-6 space-y-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formValues.first_name}
                            onChange={(e) => handleChange('first_name', e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                        />
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formValues.last_name}
                            onChange={(e) => handleChange('last_name', e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                        />
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                    </div>
                    <div>
                        <label htmlFor="rut" className="block text-sm font-medium text-gray-700">RUT</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                id="rut"
                                name="rut"
                                value={rut}
                                onChange={(e) => handleRutChange(e.target.value)}
                                className="flex-grow px-4 py-2 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                                placeholder="12345678"
                            />
                            <span>-</span>
                            <input
                                type="text"
                                id="rut_dv"
                                name="rut_dv"
                                value={rutDv}
                                onChange={(e) => handleRutDvChange(e.target.value)}
                                className="w-12 px-4 py-2 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                                placeholder="k"
                            />
                        </div>
                        {errors.rut_general && <p className="text-red-500 text-sm">{errors.rut_general}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            id="role_id"
                            name="role_id"
                            value={formValues.role_id}
                            onChange={(e) => handleChange('role_id', e.target.value)}
                            className="w-full px-4 py-2 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                        >
                            <option value="" disabled>Selecciona un rol</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                        {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}
                    </div>
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white">Crear</button>
            </form>

            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/employees" className="text-white px-4 py-2 bg-[#a91e1e] hover:bg-[#891818] transition-colors">Salir</Link>
            </div>
        </div>
        
    );
};

export default CreateEmployee;