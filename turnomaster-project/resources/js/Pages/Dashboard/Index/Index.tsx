import React from 'react';
import useRoleChecker from '../../../hooks/auth/useRoleChecker';
import Owner from './Owner/Owner';
import Hr from './Hr/Hr';
import Employees from './Employees/Employees';

const Index: React.FC = () => {
    const userRole = useRoleChecker();

    switch (userRole) {
        case 1:
            return <Owner />;
        case 2:
            return <Hr />;
        case 3:
            return <Employees />;
        default:
            return <h1>Unauthorized</h1>;
    }
};

export default Index;
