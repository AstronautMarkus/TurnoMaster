import React from 'react';
import { FaUser, FaBrush, FaBuilding} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useRoleChecker from '../../../hooks/auth/useRoleChecker';

const Settings: React.FC = () => {
    const userRole = useRoleChecker();
    const settingsOptions = [
        {
            icon: <FaUser />,
            title: 'Perfil',
            description: 'Gestiona la información de tu perfil y preferencias personales.',
            url:"/dashboard/settings/profile",
            roles: [1, 2, 3]
        },
        {
            icon: <FaBrush />,
            title: 'Apariencia',
            description: 'Personaliza la apariencia de la aplicación a tu gusto.',
            url:"/dashboard/settings/appearance",
            roles: [1, 2, 3]
        },
        {
            icon: <FaBuilding />,
            title: 'Empresa',
            description: 'Configura los detalles de tu empresa y gestiona la suscripción de TurnoMaster.',
            url:"/dashboard/settings/company",
            roles: [1]
        }
    ];

    return (
        <div className="p-5 font-sans">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">Ajustes</h1>
                {settingsOptions
                    .filter(option => userRole !== null && option.roles.includes(userRole))
                    .map((option, index) => (
                        <Link to={option.url} key={index}>
                            <div
                                className="flex items-center mb-4 p-4 border-gray-300 bg-white transition duration-200 ease-in-out transform hover:bg-gray-300"
                            >
                                <div className="text-2xl mr-4">
                                    {option.icon}
                                </div>
                                <div>
                                    <h2 className="m-0 text-lg font-semibold">{option.title}</h2>
                                    <p className="m-0 text-gray-600">{option.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
        </div>
    );
};

export default Settings;
