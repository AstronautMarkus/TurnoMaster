import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserRole {
    id: number;
    name: string;
    description: string;
}

interface Company {
    id: number;
    name: string;
}

interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
    profile_photo: string;
    companies: {
        owned: Company[];
    };
    rut: number;
    rut_dv: string;
    company_id: number;
    role_id: number;
    created_at: string;
    updated_at: string;
    company: string;
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
                    const { user, company, role } = response.data;
                    setUser({
                        ...user,
                        company,
                        role,
                        profile_photo: user.profile_photo || '/img/profile/default.png',
                    });
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
