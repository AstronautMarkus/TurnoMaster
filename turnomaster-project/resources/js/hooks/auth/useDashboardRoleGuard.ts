import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

interface JwtPayload {
    role_id: number;
}

export function useDashboardRoleGuard(requiredRoles: number | number[]) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Redirecting...');
            navigate('/*');
            return;
        }

        try {
            const decoded = jwt_decode<JwtPayload>(token);
            const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
            if (!roles.includes(decoded.role_id)) {
                alert('Access denied. Redirecting...');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Invalid token:', error);
            alert('Invalid token. Redirecting...');
            navigate('/dashboard');
        }
    }, [navigate, requiredRoles]);
}
