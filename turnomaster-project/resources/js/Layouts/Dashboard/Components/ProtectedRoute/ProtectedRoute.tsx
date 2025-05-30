import React from 'react';
import useRoleChecker from '../../../../hooks/auth/useRoleChecker';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const userRole = useRoleChecker();

    if (userRole === null) {
        return null;
    }

    if (!allowedRoles.includes(userRole)) {
        window.location.href = `/dashboard?unauthorized`;
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
