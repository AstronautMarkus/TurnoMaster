import React from 'react';
import { FaBriefcase, FaBuilding, FaRocket } from 'react-icons/fa';

const Audience: React.FC = () => {
    const categories = [
        {
            title: 'Pequeñas y Medianas Empresas',
            img: '/img/audience/dan-burton-wHsOV75Xi8Y-unsplash.jpg',
            description: 'Optimiza la gestión del tiempo laboral, reduce errores y mejora la productividad.',
            icon: <FaBuilding className="w-8 h-8 text-indigo-600" />,
        },
        {
            title: 'Empresarios',
            img: '/img/audience/sean-pollock-PhYq704ffdA-unsplash.jpg',
            description: 'Toma decisiones informadas con reportes detallados y controla mejor tu equipo.',
            icon: <FaBriefcase className="w-8 h-8 text-green-600" />,
        },
        {
            title: 'Startups',
            img: '/img/audience/annie-spratt-QckxruozjRg-unsplash.jpg',
            description: 'Escala tu empresa desde el inicio con una herramienta que crece contigo.',
            icon: <FaRocket className="w-8 h-8 text-pink-600" />,
        },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="py-10 px-6 text-4xl font-bold mb-4 text-indigo-700">¿Para quién es TurnoMaster?</h1>
                    <p className="text-lg text-gray-600">
                        Diseñado para adaptarse a distintos tipos de empresas, sin importar su tamaño ni su rubro.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                        >
                            <img
                                src={category.img}
                                alt={category.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    {category.icon}
                                    <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
                                </div>
                                <p className="text-gray-600 text-sm">{category.description}</p>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="mt-16 bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Beneficios para todas las audiencias
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700 text-base">
                        <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            📈 Aumento de productividad y eficiencia operativa
                        </li>
                        <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            🕒 Control preciso de horas laborales y turnos
                        </li>
                        <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            💬 Comunicación fluida entre RRHH y empleados
                        </li>
                        <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            📊 Reportes claros y exportables para toma de decisiones
                        </li>
                        <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            🛠️ Fácil de integrar con otros sistemas
                        </li>
                        <li className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition">
                            🔒 Seguridad y privacidad en la gestión de datos
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Audience;
