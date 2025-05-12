import { useState } from 'react';
import axios from 'axios';

const useUpdateImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateImage = async (file: File) => {
        setIsLoading(true);
        setError(null);

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
            return response.data.profile_photo;
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error updating profile image.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateImage, isLoading, error };
};

export default useUpdateImage;
