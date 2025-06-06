import { useEffect, useState } from 'react';
import useRoleChecker from '../../../hooks/auth/useRoleChecker';
import { FaCircleXmark } from "react-icons/fa6";
import Owner from './Owner/Owner';
import Hr from './Hr/Hr';
import Employees from './Employees/Employees';

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
            {showToast && (
                <div className="fixed bottom-5 right-5 z-50 dashboard-background-error text-white px-6 py-4 shadow-lg rounded-lg flex items-start gap-3 animate-fade-in min-w-[320px]">
                    <div className="mt-1 text-2xl">
                        <FaCircleXmark />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg mb-1">Acceso denegado</h2>
                        <p className="text-sm mb-1">No tienes autorización para acceder a esta sección.</p>
                    </div>
                </div>
            )}
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
