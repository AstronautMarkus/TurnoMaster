import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UnauthorizedAlert = () => {
    useEffect(() => {
        Swal.fire({
            toast: true,
            position: 'bottom-right',
            icon: 'warning',
            title: 'Acceso denegado',
            text: 'No tienes autorización para acceder a esta sección. Has sido redirigido a la página principal.',
            showConfirmButton: false,
            showCloseButton: false,
            timer: 4000,
            timerProgressBar: true,
            color: '#000',
            didOpen: () => {
            const swalContainer = Swal.getPopup();
            if (swalContainer) {
                const progressBar = swalContainer.querySelector('.swal2-timer-progress-bar') as HTMLElement;
                if (progressBar) {
                progressBar.style.background = '#f8bb86';
                }
            }
            },
        });
    }, []);

    return null;
};

export default UnauthorizedAlert;
