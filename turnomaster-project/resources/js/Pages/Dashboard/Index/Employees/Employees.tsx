import React, { useState } from 'react';
import { FaCalendar, FaBullhorn } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import AttendanceWidget from '../getShift/getShift';

const Employees = () => {

    const [currentTime] = useState(new Date());

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
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left mb-4 sm:mb-6 mt-2 sm:mt-4">
                TurnoMaster - Empleados
            </h1>
            
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-grow bg-white shadow-md p-4 sm:p-6">
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2">{greeting}.</h2>
                        <p className="text-xs sm:text-sm md:text-base">
                            Este es el panel de control de TurnoMaster, donde podrás gestionar tus turnos y citas de manera eficiente.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <Link
                            to="/dashboard/reports"
                            className="dashboard-button-success text-white py-3 px-2 sm:p-4 flex flex-col items-center justify-center w-full transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row items-center w-full justify-center">
                                <div className="text-3xl sm:text-4xl mb-2 sm:mb-0 sm:mr-4">
                                    <FaBullhorn />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-center">Asistencia y Reportes</h3>
                                    <p className="text-xs sm:text-sm text-center">
                                        Gestiona tu asistencia y reporta incidencias aquí
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                
                <AttendanceWidget />
                
            </div>
        </div>
    );
};

export default Employees;