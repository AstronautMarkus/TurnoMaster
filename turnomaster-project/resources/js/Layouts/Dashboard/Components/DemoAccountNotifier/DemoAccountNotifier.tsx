import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const DemoAccountNotifier: React.FC = () => {
    const [isNotifierVisible, setIsNotifierVisible] = useState(true);

    useEffect(() => {
        const notifierState = sessionStorage.getItem("demoNotifierHidden");
        if (notifierState === "true") {
            setIsNotifierVisible(false);
        }
    }, []);

    const closeNotifier = () => {
        setIsNotifierVisible(false);
        sessionStorage.setItem("demoNotifierHidden", "true");
    };

    if (!isNotifierVisible) {
        return null;
    }

    return (
        <div className="relative dashboard-background-error text-white md:p-4 p-2 flex flex-col items-start justify-center shadow-md w-full max-w-xs md:w-80 md:max-w-full mx-auto md:mx-0 md:ml-auto md:mr-0">
            <button
                className="absolute top-2 right-2 text-white hover:text-gray-900"
                onClick={closeNotifier}
                aria-label="Cerrar">
                <FaTimes />
            </button>
            <span className="font-semibold text-base">Cuenta de pruebas</span>
            <div className="w-full border-b-2 border-white-400 my-2" />
            <span className="text-xs text-white">
                Esta cuenta es solo para demostración. Ninguna operación será guardada luego del periodo de prueba.
                <br />
                <br />
                Si deseas realizar operaciones reales, por favor <a href="/prices" target="_blank" className="text-white font-bold underline">Adquiere una suscripción</a>.
            </span>
        </div>
    );
};

export default DemoAccountNotifier;