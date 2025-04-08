import React from 'react';
import useProfileData from './useProfileData';

const Profile: React.FC = () => {
    const user = useProfileData();

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Mi perfil</h1>

            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <img src="/img/default/default.jpg" alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover"/>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                            <p className="text-gray-600">{user?.email}</p>
                            <p className="text-gray-600">cellphone_number</p>
                        </div>
                    </div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        Editar perfil
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Detalles de la cuenta</h2>
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 font-medium">Tipo de suscripción:</p>
                            <p className="font-bold">Premium</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Fecha de validación:</p>
                            <p className="font-bold">xx/xx/xxxx</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Fecha de renovación:</p>
                            <p className="font-bold">16/03/2026</p>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Método de pago:</p>
                            <p className="font-bold">Tarjeta de crédito</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Lista de empresas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-400">Logo</span>
                        </div>
                        <span className="text-gray-700 font-medium">TurnoMaster 1.0</span>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-400">Logo</span>
                        </div>
                        <span className="text-gray-700 font-medium">AbbyBotProject 2.0</span>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-400">Logo</span>
                        </div>
                        <span className="text-gray-700 font-medium">Reyes&Friends 4.0</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;
