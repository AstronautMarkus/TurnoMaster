import { useEffect, useState } from 'react';

interface UserProfile {
    name: string;
    email: string;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
}

const useProfileData = () => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return user;
};

export default useProfileData;
