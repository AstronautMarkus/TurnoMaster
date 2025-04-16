import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
    role_id: number;
    [key: string]: any;
}

const useRoleChecker = (): number | null => {
    const [roleId, setRoleId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                if (decoded.role_id) {
                    setRoleId(decoded.role_id);
                } else {
                    console.warn('role_id not found in token');
                }
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);

    return roleId;
};

export default useRoleChecker;