import {
  FaBolt,
  FaLock,
  FaCogs,
  FaUsers,
  FaChartLine,
  FaMobileAlt
} from 'react-icons/fa';

export const useGetFeatures = () => {
  return [
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
};
