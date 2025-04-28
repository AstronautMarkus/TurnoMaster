import React from 'react';
import useProfileData from './useProfileData';
import AuthLoadingScreen from '../../../Components/Auth/LoadingScreen/AuthLoadingScreen';

const Profile: React.FC = () => {
    const user = useProfileData();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
            <AuthLoadingScreen />
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Mi perfil</h1>

            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 relative">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <img src="/img/default/default.jpg" alt="Foto de perfil" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"/>
                        <div className="text-center sm:text-left">
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-800">{user?.name}</h1>
                            <p className="text-sm sm:text-base text-gray-600">Correo electrónico: {user?.email}</p>
                            <p className="text-sm sm:text-base text-gray-600">
                                <span className="font-medium">Tipo de usuario:</span> {user?.role?.name}
                            </p>
                        </div>
                    </div>
                    <button className="bg-red-500 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-red-600 transition">
                        Editar perfil
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Lista de empresas</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {user?.companies?.owned.map((company) => (
                        <div key={company.id} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                                <img src="/img/default/company-default.jpg" alt="Logo de la empresa" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-gray-700 font-medium">{company.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
