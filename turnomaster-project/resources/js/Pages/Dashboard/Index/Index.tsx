import { useEffect, useState } from 'react';
import useRoleChecker from '../../../hooks/auth/useRoleChecker';
import Owner from './Owner/Owner';
import Hr from './Hr/Hr';
import Employees from './Employees/Employees';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Index = () => {
    const userRole = useRoleChecker();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('unauthorized')) {
            setShowToast(true);
            Swal.fire({
                toast: true,
                position: 'bottom-right',
                icon: 'warning',
                title: 'Acceso denegado',
                text: 'No tienes autorización para acceder a esta sección. Has sido redirigido a la página principal.',
                showConfirmButton: false,
                showCloseButton: true,
                timer: 4000,
                timerProgressBar: true,
                color: '#000',
            });
            setTimeout(() => setShowToast(false), 4000);
        }
    }, []);

    return (
        <>
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
