import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useRoleChecker from '../../../../hooks/auth/useRoleChecker';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const userRole = useRoleChecker();
    const location = useLocation();

    if (userRole === null) {
        return null;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={`/dashboard?unauthorized`} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
