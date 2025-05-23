import React from 'react';
import { FaUser, FaBrush} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
    const settingsOptions = [
        {
            icon: <FaUser />,
            title: 'Perfil',
            description: 'Gestiona la información de tu perfil y preferencias personales.',
            url:"/dashboard/profile"
        },
        {
            icon: <FaBrush />,
            title: 'Apariencia',
            description: 'Personaliza la apariencia de la aplicación a tu gusto.',
            url:"/dashboard/appearance"
        },
    ];

    return (
        <div className="p-5 font-sans">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">Apariencia</h1>
            
        </div>
    );
};

export default Settings;
