import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const CrossCompanyAlert = () => {
    useEffect(() => {
        Swal.fire({
            toast: true,
            position: 'bottom-right',
            icon: 'error',
            title: 'Operación no permitida',
            text: 'No puedes editar usuarios de otras empresas.',
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

export default CrossCompanyAlert;
