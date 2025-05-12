import { useState } from 'react';
import axios from 'axios';

const useUpdateImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateImage = async (file: File) => {
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('profile_image', file);

        try {
            const response = await axios.post('/api/user/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setIsSuccess(true);
            return response.data.profile_photo;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error actualizando la foto de perfil.');
            throw err;
        } finally {
            setIsLoading(false);
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.reload();
        }
    };

    return { updateImage, isLoading, error, isSuccess };
};

export default useUpdateImage;
