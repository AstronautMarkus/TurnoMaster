import React from 'react';
import {
  FaBolt,
  FaLock,
  FaCogs,
  FaUsers,
  FaChartLine,
  FaMobileAlt
} from 'react-icons/fa';

const features = [
  {
    icon: <FaBolt className="text-yellow-500 text-4xl mb-4" />,
    title: 'Rendimiento Rápido',
    description: 'Nuestra plataforma está optimizada para ofrecer un rendimiento excepcional.',
  },
  {
    icon: <FaLock className="text-blue-600 text-4xl mb-4" />,
    title: 'Seguridad',
    description: 'Tus datos están protegidos con las mejores prácticas de seguridad.',
  },
  {
    icon: <FaCogs className="text-gray-700 text-4xl mb-4" />,
    title: 'Personalización',
    description: 'Configura la plataforma según tus necesidades específicas.',
  },
  {
    icon: <FaUsers className="text-purple-600 text-4xl mb-4" />,
    title: 'Colaboración',
    description: 'Trabaja en equipo de manera eficiente y sin complicaciones.',
  },
  {
    icon: <FaChartLine className="text-green-600 text-4xl mb-4" />,
    title: 'Análisis Avanzado',
    description: 'Obtén información detallada para tomar decisiones informadas.',
  },
  {
    icon: <FaMobileAlt className="text-pink-500 text-4xl mb-4" />,
    title: 'Compatibilidad Móvil',
    description: 'Accede a la plataforma desde cualquier dispositivo móvil.',
  },
];

const Features: React.FC = () => {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">Características del Proyecto</h1>
        <p className="text-lg text-gray-600 mb-12">
          Descubre las funcionalidades más destacadas que hacen de TurnoMaster una solución poderosa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 text-center"
            >
              {feature.icon}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
