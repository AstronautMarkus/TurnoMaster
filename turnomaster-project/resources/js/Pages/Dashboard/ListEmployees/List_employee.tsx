import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListarEmpleados = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date()); // Add state for current time

    interface Empleado {
        id: number;
        name: string;
        email: string;
        role_id: number;
        company_id: number | null;
        is_trial: boolean;
        expires_at: string | null;
    }

    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [filtro, setFiltro] = useState('name'); // Default filter: name
    const [busqueda, setBusqueda] = useState('');
    const [empleadosFiltrados, setEmpleadosFiltrados] = useState<Empleado[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Fetch employees from the backend
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get('/api/employees');
                const userRoleId = response.data.userRoleId; // Assuming backend sends user role ID
                let empleadosFiltrados = response.data.employees;

                // Apply role-based filtering
                if (userRoleId === 1) {
                    // Owner: Show all users except owners
                    empleadosFiltrados = empleadosFiltrados.filter((emp: Empleado) => emp.role_id !== 1);
                } else if (userRoleId === 2) {
                    // R.R.H.H.: Show only normal users
                    empleadosFiltrados = empleadosFiltrados.filter((emp: Empleado) => emp.role_id !== 1 && emp.role_id !== 2);
                } else {
                    // Unrecognized role: Show no employees
                    empleadosFiltrados = [];
                }

                setEmpleados(empleadosFiltrados);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmpleados();
    }, []);

    useEffect(() => {
        // Filter and sort employees based on the filter and search query
        let empleadosOrdenados = [...empleados];
        if (filtro === 'name') {
            empleadosOrdenados.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filtro === 'email') {
            empleadosOrdenados.sort((a, b) => a.email.localeCompare(b.email));
        }

        if (busqueda) {
            empleadosOrdenados = empleadosOrdenados.filter((empleado) =>
                empleado.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                empleado.email.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        setEmpleadosFiltrados(empleadosOrdenados);
    }, [filtro, busqueda, empleados]);

    const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltro(e.target.value);
    };

    const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    };

    return (
        <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-4xl mx-auto mt-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h1>
                <p className="text-gray-600 mt-2">{currentTime.toLocaleTimeString()}</p> {/* Display current time */}
            </div>
            <div className="mt-10">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
                    <button
                        className="w-full md:w-auto px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => navigate('/dashboard/CreateEmployees')} // Updated navigation path
                    >
                        Crear empleados
                    </button>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <select
                            value={filtro}
                            onChange={handleFiltroChange}
                            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                        >
                            <option value="name">Ordenar por Nombre</option>
                            <option value="email">Ordenar por Correo</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o correo"
                            value={busqueda}
                            onChange={handleBusquedaChange}
                            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:min-w-[250px]"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">ID</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Nombre</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Correo</th>
                                <th className="px-4 py-2 text-left text-gray-600 font-medium">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleadosFiltrados.map((empleado, index) => (
                                <tr
                                    key={empleado.id}
                                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                                >
                                    <td className="px-4 py-2 text-gray-700">{empleado.id}</td>
                                    <td className="px-4 py-2 text-gray-700">{empleado.name}</td>
                                    <td className="px-4 py-2 text-gray-700">{empleado.email}</td>
                                    <td className="px-4 py-2 text-gray-700">{empleado.role_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListarEmpleados;
