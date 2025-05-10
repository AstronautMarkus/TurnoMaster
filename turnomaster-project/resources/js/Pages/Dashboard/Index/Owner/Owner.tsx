import React, { useState, useEffect } from 'react';
import { FaCalendar, FaUsers } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Owner = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

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
                        <Link to="/dashboard/turnos" className="bg-[#891818] text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto hover:bg-[#a91a1a] transition-colors">
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
                        
                        <Link to="/dashboard/usuarios" className="bg-gray-500 text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto hover:bg-gray-600 transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaUsers />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Usuarios</h3>
                                    <p className="text-sm">Gestiona tus usuarios aquí</p>
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
                        <h2 className="text-2xl font-semibold mb-2">Estado actual de la empresa</h2>
                        <p>En esta sección puedes ver un resumen de tu empresa, la cantidad de empleados y los detalles de la suscripción a TurnoMaster.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Owner;