import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const DemoAccountNotifier: React.FC = () => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const toggleInfo = () => {
        setIsInfoVisible(!isInfoVisible);
    };

    return (
        <div className="relative bg-blue-100 text-blue-800 rounded-lg p-4 flex items-center justify-center shadow-md w-64 space-x-2">
            <span className="font-semibold text-sm">Cuenta de pruebas</span>
            <button
                onClick={toggleInfo}
                className="text-blue-800 hover:text-blue-600 focus:outline-none"
                aria-label="Información sobre la cuenta de pruebas"
            >
                <FaCircleInfo className="w-5 h-5" />
            </button>
            {isInfoVisible && (
                <div className="absolute bottom-full mb-2 right-0 transform translate-x-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 text-sm text-gray-700 z-50">
                    Esta cuenta es solamente para fines de demostración. Se pueden realizar todas las funciones pero ninguna de las operaciones servirá para producción. Para realizar operaciones reales, por favor, adquirir una cuenta en el apartado de "Precios".
                </div>
            )}
        </div>
    );
};

export default DemoAccountNotifier;