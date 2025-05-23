import React, { useState, useEffect } from 'react';
import { FaCalendar, FaUsers } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import useGetCompanyDetails from './useGetCompanyDetails';

const Owner = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { data: companyData, loading } = useGetCompanyDetails();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour >= 6 && hour < 12) {
            return "Buenos días";
        } else if (hour >= 12 && hour < 18) {
            return "Buenas tardes";
        } else {
            return "Buenas noches";
        }
    };

    const greeting = getGreeting();

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">TurnoMaster - Inicio</h1>
            
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-grow bg-white shadow-md sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">{greeting}.</h2>
                        <p className="text-sm sm:text-base">Este es el panel de control de TurnoMaster, donde podrás gestionar tus turnos y citas de manera eficiente.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/dashboard/turnos" className="bg-reyes hover:bg-reyes-active text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaCalendar />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Turnos</h3>
                                    <p className="text-sm">Gestiona tus turnos aquí</p>
                                </div>
                            </div>
                        </Link>
                        
                        <Link to="/dashboard/employees" className="bg-gray-500 text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto hover:bg-gray-600 transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaUsers />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Empleados</h3>
                                    <p className="text-sm">Gestiona tus empleados aquí</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="bg-white shadow-lg sm:p-6 flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Hora actual:</h3>
                        <p className="text-lg text-gray-700 text-center">{currentTime.toLocaleTimeString()}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-300">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Próximo horario de entrada:</h3>
                        <p className="text-lg text-gray-700 text-center">No hay horarios disponible.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-6">
                <div className="bg-white shadow-md sm:p-6">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Mi empresa</h2>
                        {loading ? (
                            <div className="flex items-center justify-center h-48">
                                <p className="text-lg font-semibold">Cargando...</p>
                            </div>
                        ) : companyData && companyData.company ? (
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="w-48 h-48 bg-gray-200 overflow-hidden rounded">
                                    <img src={companyData.company.profile_image} alt="Empresa" className="object-cover w-full h-full" />
                                </div>
                                <button className="mt-4 text-white px-4 py-2 bg-gray-400 cursor-not-allowed" disabled>
                                    Cambiar logo
                                </button>
                                <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-lg font-bold">Nombre de la empresa:</p>
                                        <p className="font-normal">{companyData.company.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Creada por:</p>
                                        <p className="font-normal">{companyData.company.email || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Fecha de registro:</p>
                                        <p className="font-normal">{companyData.company.created_at || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Ultima modificación:</p>
                                        <p className="font-normal">{companyData.company.updated_at || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Miembros totales:</p>
                                        <p className="font-normal">{companyData.employees?.total || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Administradores:</p>
                                        <p className="font-normal">{companyData.employees?.details?.admin || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Recursos Humanos:</p>
                                        <p className="font-normal">{companyData.employees?.details?.hr || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Empleados:</p>
                                        <p className="font-normal">{companyData.employees?.details?.employee || 0}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-48">
                                <p className="text-lg font-semibold text-red-500">Error al cargar los datos de la empresa.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-6">
                <div className="bg-white shadow-md sm:p-6">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold mb-4">Suscripción de la empresa</h2>
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-lg font-bold">Plan actual:</p>
                                    <p className="font-normal">TBA</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Fecha de inicio:</p>
                                    <p className="font-normal">TBA</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Fecha de expiración:</p>
                                    <p className="font-normal">TBA</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Estado:</p>
                                    <p className="font-normal text-green-500">TBA</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Usuarios permitidos:</p>
                                    <p className="font-normal">TBA</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Costo mensual:</p>
                                    <p className="font-normal">TBA</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Renovación automática:</p>
                                    <p className="font-normal">TBA</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">Soporte prioritario:</p>
                                    <p className="font-normal">TBA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Owner;