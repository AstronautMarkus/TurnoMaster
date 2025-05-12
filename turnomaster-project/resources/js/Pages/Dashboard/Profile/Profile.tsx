import React, { useState } from 'react';
import useProfileData from './useProfileData';
import useUpdateImage from './useUpdateImage';
import AuthLoadingScreen from '../../../Components/Auth/LoadingScreen/AuthLoadingScreen';
import { FaUserShield, FaUser } from 'react-icons/fa';
import { FaUserGear } from "react-icons/fa6";

const Profile: React.FC = () => {
    const user = useProfileData();
    const { updateImage, isLoading, error } = useUpdateImage();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPreviewImage(URL.createObjectURL(file));
            try {
                const updatedImagePath = await updateImage(file);
                alert('Imagen actualizada correctamente.');
                // Optionally refresh user data here
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold text-left mb-6 mt-4">Mi perfil</h1>
            
            <div className="flex gap-4">
                {!user ? (
                    <div className="flex items-center justify-center w-full">
                        <AuthLoadingScreen />
                    </div>
                ) : (
                    <>
                        <div className="flex-grow w-9/10 bg-white shadow-md sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-2">Información Personal</h2>
                                <p>Aquí puedes ver los detalles de tu perfil personal.</p>
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
                                <img 
                                    src={previewImage || user.profile_photo} 
                                    className="object-cover w-full h-full" 
                                    alt="Profile"
                                />
                            </div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="mt-4" 
                                onChange={handleImageChange} 
                                disabled={isLoading}
                            />
                            {isLoading && <p className="text-sm text-gray-500 mt-2">Subiendo imagen...</p>}
                            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                        </div>
                    </>
                )}
            </div>

            {user && (
                <div className="mt-6 bg-white shadow-md sm:p-6">
                    <h2 className="text-2xl font-semibold mb-4">Rol empleado en {user.company}</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">
                            {user.role.id === 1 ? <FaUserShield /> : user.role.id === 3 ? <FaUser /> : <FaUserGear />}
                        </div>
                        <div>
                            <p className="text-lg font-bold">{user.role.name}</p>
                            <p>{user.role.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
