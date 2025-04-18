import React, { useState, useEffect } from 'react';

const Employees = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white rounded-xl p-12 px-6 md:px-28 shadow-2xl w-full max-w-sm md:max-w-lg mx-auto mt-10">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Turnomaster - Inicio</h1>
                <h1 className="text-2xl font-bold text-gray-800">Empleados</h1>
                <p className="text-gray-600 mt-2">{currentTime.toLocaleTimeString()}</p>
            </div>
            <div className="mt-10">
                <button className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Turnos
                </button>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Registra tu jornada | Actualizar estados
                </p>
                <button className="w-full px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6">
                    Reportes
                </button>
                <p className="text-center text-sm text-gray-600 mt-2">
                    ¿Necesita justificar o tienes algún inconveniente?
                </p>
            </div>
        </div>
    );
};

export default Employees;