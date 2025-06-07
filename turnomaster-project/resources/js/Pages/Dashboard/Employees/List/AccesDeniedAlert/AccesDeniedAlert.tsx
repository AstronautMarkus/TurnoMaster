import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AccesDeniedAlert = () => {
    useEffect(() => {
        Swal.fire({
            toast: true,
            position: 'bottom-right',
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes permisos para editar este usuario.',
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
                        progressBar.style.background = '#e74c3c';
                    }
                }
            },
        });
    }, []);

    return null;
};

export default AccesDeniedAlert;
