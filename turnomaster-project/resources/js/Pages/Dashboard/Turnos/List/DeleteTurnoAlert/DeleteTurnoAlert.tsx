import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import useDashboardTheme from "../../../../../hooks/themes/useDashboardTheme";

interface DeleteTurnoAlertProps {
    turno: {
        name: string;
        assigned_users_count: number;
    };
    onClose: () => void;
}

const DeleteTurnoAlert: React.FC<DeleteTurnoAlertProps> = ({ turno, onClose }) => {
    const theme = useDashboardTheme();
    const confirmed = useRef(false);

    useEffect(() => {
        Swal.fire({
            title: '¿Eliminar turno?',
            html: `
                <div class="theme-${theme} p-2">
                  <div class="flex flex-col items-center mb-2">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full dashboard-background-error mb-2">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                        </svg>
                    </div>
                    <p class="text-gray-800 text-center mb-2">
                      Vas a eliminar el turno <span class="font-bold">"${turno.name}"</span>.
                    </p>
                  </div>
                  <div class="flex justify-center space-x-4 mt-4">
                    <button type="button" id="swal-cancel" class="px-5 py-2 dashboard-button-secondary text-white font-semibold transition-colors">Cancelar</button>
                    <button type="button" id="swal-next" class="px-5 py-2 dashboard-button text-white font-semibold transition-colors bg-yellow-600 hover:bg-yellow-700">Continuar</button>
                  </div>
                </div>
            `,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                const nextBtn = document.getElementById('swal-next');
                const cancelBtn = document.getElementById('swal-cancel');
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        Swal.fire({
                            title: '',
                            html: `
                                <div class="theme-${theme} p-2">
                                  <div class="flex flex-col items-center mb-2">
                                    <div class="flex items-center justify-center w-16 h-16 rounded-full dashboard-background-error mb-2">
                                      <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                                      </svg>
                                    </div>
                                    <h2 class="text-2xl font-bold dashboard-text mb-1">Confirmar eliminación</h2>
                                    <p class="text-gray-800 text-center mb-2">
                                      Esta acción es <span class="font-bold dashboard-text-error">irreversible</span><br/><br/>
                                      ${
                                        turno.assigned_users_count > 0
                                            ? `<b>Advertencia:</b> Este turno tiene <b>${turno.assigned_users_count} persona(s) asignada(s)</b>.<br> <br>
                                                Si eliminas este turno, también se eliminarán <b>todos los registros</b> de días asignados a estas personas <b>de forma permanente</b>.<br/><br/>`
                                            : ''
                                      }
                                      ¿Estás seguro de que deseas continuar?
                                    </p>
                                  </div>
                                  <div class="flex justify-center space-x-4 mt-4">
                                    <button type="button" id="swal-cancel-final" class="px-5 py-2 dashboard-button-secondary text-white font-semibold transition-colors">Cancelar</button>
                                    <button type="button" id="swal-confirm" class="px-5 py-2 dashboard-button text-white font-semibold transition-colors bg-red-600 hover:bg-red-700">Eliminar</button>
                                  </div>
                                </div>
                            `,
                            showConfirmButton: false,
                            showCancelButton: false,
                            didOpen: () => {
                                const confirmBtn = document.getElementById('swal-confirm');
                                const cancelBtn2 = document.getElementById('swal-cancel-final');
                                if (confirmBtn) {
                                    confirmBtn.addEventListener('click', () => {
                                        confirmed.current = true;
                                        Swal.close();
                                        onClose();
                                    });
                                }
                                if (cancelBtn2) {
                                    cancelBtn2.addEventListener('click', () => {
                                        Swal.close();
                                        onClose();
                                    });
                                }
                            },
                            willClose: () => {
                                if (!confirmed.current) onClose();
                            }
                        });
                    });
                }
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => {
                        Swal.close();
                        onClose();
                    });
                }
            },
            willClose: () => {
                if (!confirmed.current) onClose();
            }
        });

        return () => {
            Swal.close();
        };
    }, [turno, theme, onClose]);

    return null;
};

export default DeleteTurnoAlert;
