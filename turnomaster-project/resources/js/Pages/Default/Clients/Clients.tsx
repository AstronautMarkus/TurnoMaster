import React from 'react';
import { Link } from 'react-router-dom';

const Clients: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Nuestros Clientes</h1>
                    <p className="mt-2 text-lg text-gray-700">
                        Muy pronto verás aquí a las empresas que confían en TurnoMaster. ¿Quieres ser una de ellas?
                    </p>
                </div>
            </header>

            <main className="container mx-auto py-12 px-4 text-center">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Quieres aparecer aquí?</h2>
                    <p className="text-gray-600 mb-6">
                        Estamos en búsqueda de nuestros primeros casos de éxito.<br />
                        Si eres una pyme o empresa que quiere mejorar su control de asistencia, te invitamos a unirte a TurnoMaster y ser parte de nuestra vitrina de clientes destacados.
                    </p>
                    <Link to="/prices" className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                        ¡Quiero ser cliente destacado!
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Clients;
