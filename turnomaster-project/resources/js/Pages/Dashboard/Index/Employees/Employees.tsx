import React, { useState, useEffect } from 'react';
import { FaCalendar, FaBullhorn } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import useGetCompanyDetails from '../Owner/useGetCompanyDetails';

const Employees = () => {

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
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">TurnoMaster - Empleados</h1>
            
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-grow bg-white shadow-md sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">{greeting}.</h2>
                        <p className="text-sm sm:text-base">Este es el panel de control de TurnoMaster, donde podrás gestionar tus turnos y citas de manera eficiente.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/dashboard/turnos" className="dashboard-button text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaCalendar />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Turnos</h3>
                                    <p className="text-sm">Registra tus turnos y movimientos en el trabajo aquí</p>
                                </div>
                            </div>
                        </Link>
                        
                        <Link to="/dashboard/reports" className="dashboard-button-success text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaBullhorn />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Reportes</h3>
                                    <p className="text-sm">Si necesitas reportar o justificar algo, hazlo aquí</p>
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
        </div>
    );
};

export default Employees;