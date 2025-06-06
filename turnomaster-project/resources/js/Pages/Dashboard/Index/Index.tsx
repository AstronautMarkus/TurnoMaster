import { useEffect, useState } from 'react';
import useRoleChecker from '../../../hooks/auth/useRoleChecker';
import Owner from './Owner/Owner';
import Hr from './Hr/Hr';
import Employees from './Employees/Employees';
import UnauthorizedAlert from './UnauthorizedAlert/UnauthorizedAlert';

const Index = () => {
    const userRole = useRoleChecker();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('unauthorized')) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
        }
    }, []);

    return (
        <>
            {showToast && <UnauthorizedAlert />}
            {(() => {
                switch (userRole) {
                    case 1:
                        return <Owner />;
                    case 2:
                        return <Hr />;
                    case 3:
                        return <Employees />;
                    default:
                        return <h1>Usuario no autorizado</h1>;
                }
            })()}
        </>
    );
};

export default Index;
