import React, { useState } from 'react';
import useProfileData from './useProfileData';
import useUpdateImage from './useUpdateImage';
import LoadingScreen from '../../../Components/LoadingScreen/LoadingScreen';
import { FaUserShield, FaUser, FaCrown } from 'react-icons/fa';
import { FaUserGear } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const user = useProfileData();
    const { updateImage, deleteImage, isLoading, error, isSuccess } = useUpdateImage();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPreviewImage(URL.createObjectURL(file));
            try {
                await updateImage(file);
                
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
                        <LoadingScreen theme='dashboard' />
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
                                    <p className="font-bold">{user.company?.name}</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/10 bg-white shadow-md sm:p-6 flex flex-col items-center">
                            <h2 className="text-1xl font-semibold mb-2">Imagen de perfil</h2> 
                            <div className="w-48 h-48 bg-gray-200 overflow-hidden rounded">
                                <img 
                                    src={user.profile_photo} 
                                    className="object-cover w-full h-full" 
                                    alt="Profile"
                                />
                            </div>
                            <button 
                                className="mt-4 text-white px-4 py-2 dashboard-button transition-colors"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Cambiar foto
                            </button>
                        </div>
                    </>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Cambiar foto de perfil</h2>
                        <div className="w-48 h-48 bg-gray-200 overflow-hidden rounded mx-auto mb-4">
                            <img 
                                src={previewImage || user?.profile_photo} 
                                className="object-cover w-full h-full" 
                                alt="Preview"
                            />
                        </div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="block w-full mb-4"
                            onChange={handleImageChange} 
                            disabled={isLoading}
                        />
                        {isLoading && <p className="text-sm dashboard-text mb-2">Subiendo imagen...</p>}
                        {error && <strong className="text-sm dashboard-text-error mb-2">{error}</strong>}
                        {isSuccess && <p className="text-m dashboard-text-success mb-2">Imagen actualizada correctamente.</p>}
                        <div className="flex justify-end gap-2 mt-4">
                            <button 
                                className="text-white px-4 py-2 dashboard-button transition-colors"
                                onClick={async () => {
                                    try {
                                        await deleteImage();
                                        setPreviewImage(null);
                                        setIsModalOpen(false);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                disabled={isLoading}
                            >
                                Borrar imagen
                            </button>
                            <button 
                                className="px-4 py-2 text-white dashboard-button-secondary transition-colors"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {user && (
                <div className="mt-6 bg-white shadow-md sm:p-6">
                    <h2 className="text-2xl font-semibold mb-4">Rol empleado en {user.company?.name}</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">
                            {user.role.id === 1 ? <FaUserShield /> : user.role.id === 3 ? <FaUser /> : <FaUserGear />}
                        </div>
                        <div>
                            <p className="text-lg font-bold">{user.role.name}</p>
                            <p className="italic">{user.role.description}</p>
                        </div>
                    </div>
                    {user.email === user.company?.owner_email && (
                        <div className="mt-6 p-4 dashboard-background-secondary flex items-center gap-4">
                            <div className="text-4xl text-white">
                                <FaCrown/>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1 flex items-center text-white">Dueño de la compañía</h3>
                                <p className="text-white italic">Este usuario es el dueño de la compañía <strong>{user.company?.name}</strong>.</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/settings" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>
        </div>
    );
};

export default Profile;
