import React from 'react';
import useProfileData from './useProfileData';
import AuthLoadingScreen from '../../../Components/Auth/LoadingScreen/AuthLoadingScreen';

const Profile: React.FC = () => {
    const user = useProfileData();

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold text-left mb-6 mt-4">Mi perfil</h1>
            
            <div className="flex gap-4">
                { !user ? (
                    <div className="flex items-center justify-center w-full">
                        <AuthLoadingScreen />
                    </div>
                ) : (
                    <>
                        <div className="flex-grow w-9/10 bg-white shadow-md sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Información Personal</h2>
                                <p className="text-gray-600">Aquí puedes ver los detalles de tu perfil personal.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Nombre</label>
                                    <p className="font-bold">{user.first_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Apellido</label>
                                    <p className="font-bold">{user.last_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">RUT</label>
                                    <p className="font-bold">{user.rut}-{user.rut_dv}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Email</label>
                                    <p className="font-bold">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Teléfono</label>
                                    <p className="font-bold">N/A</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Empresa</label>
                                    <p className="font-bold">{user.company}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/10 bg-white shadow-md sm:p-6 flex flex-col">
                            <label className="block text-m font-medium mb-2">Imagen de perfil</label>
                            <div className="w-48 h-48 bg-gray-200 overflow-hidden rounded">
                                <img src="/img/profile/default.jpg" className="object-cover w-full h-full"/>
                            </div>
                            <button className="mt-4 bg-[#e01d1d] text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">
                                Cambiar imagen
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
