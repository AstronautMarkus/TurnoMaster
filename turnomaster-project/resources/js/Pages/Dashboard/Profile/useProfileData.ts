import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserRole {
    name: string;
}

interface Company {
    id: number;
    name: string;
}

interface UserProfile {
    name: string;
    email: string;
    role: UserRole;
    companies: {
        owned: Company[];
    };
}

const useProfileData = () => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    return user;
};

export default useProfileData;
