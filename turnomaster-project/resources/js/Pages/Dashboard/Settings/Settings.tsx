import React from 'react';
import { FaUser, FaBrush, FaBuilding} from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Settings: React.FC = () => {
    const settingsOptions = [
        {
            icon: <FaUser />,
            title: 'Perfil',
            description: 'Gestiona la información de tu perfil y preferencias personales.',
            url:"/dashboard/settings/profile"
        },
        {
            icon: <FaBrush />,
            title: 'Apariencia',
            description: 'Personaliza la apariencia de la aplicación a tu gusto.',
            url:"/dashboard/settings/appearance"
        },
        {
            icon: <FaBuilding />,
            title: 'Empresa',
            description: 'Configura los detalles de tu empresa y gestiona la suscripción de TurnoMaster.',
            url:"/dashboard/settings/company"
        }
    ];

    return (
        <div className="p-5 font-sans">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">Ajustes</h1>
                {settingsOptions.map((option, index) => (
                    <Link to={option.url}>
                        <div
                            key={index}
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
