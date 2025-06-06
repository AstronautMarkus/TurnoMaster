import React, { useEffect } from "react";
import Swal from "sweetalert2";
import useDashboardTheme from "../../../../../hooks/themes/useDashboardTheme";

interface DeleteTurnoAlertProps {
    turnoName: string;
    onClose: () => void;
}

const DeleteTurnoAlert: React.FC<DeleteTurnoAlertProps> = ({ turnoName, onClose }) => {
    const theme = useDashboardTheme();

    useEffect(() => {
        Swal.fire({
            title: '¿Está seguro?',
            html: `
                <div class="theme-${theme}">
                    <div class="mb-4">
                        ¿Desea eliminar el turno <b>"${turnoName}"</b>?<br>Esta acción no se puede deshacer.
                    </div>
                    <div class="flex justify-center gap-2">
                        <button type="button" id="swal-confirm" class="text-white px-4 py-2 text-sm dashboard-button transition-colors flex items-center">Sí, eliminar</button>
                        <button type="button" id="swal-cancel" class="dashboard-button-warning px-4 py-2 text-white">Cancelar</button>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                const swalConfirm = document.getElementById('swal-confirm');
                const swalCancel = document.getElementById('swal-cancel');
                if (swalConfirm) {
                    swalConfirm.addEventListener('click', () => {
                        Swal.close();
                        onClose();
                        
                    });
                }
                if (swalCancel) {
                    swalCancel.addEventListener('click', () => {
                        Swal.close();
                        onClose();
                    });
                }
            },
            willClose: () => {
                onClose();
            }
        });

    }, [turnoName, theme]);

    return null;
};

export default DeleteTurnoAlert;
