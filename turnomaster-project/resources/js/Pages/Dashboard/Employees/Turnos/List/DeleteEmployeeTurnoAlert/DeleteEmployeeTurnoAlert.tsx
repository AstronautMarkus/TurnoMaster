import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useDashboardTheme from "../../../../../../hooks/themes/useDashboardTheme";

interface DeleteEmployeeTurnoAlertProps {
    userId: number;
    shiftId: number;
    shiftName: string;
    onClose: () => void;
    onDeleted: (shiftId: number) => void;
}

const DeleteEmployeeTurnoAlert: React.FC<DeleteEmployeeTurnoAlertProps> = ({
    userId,
    shiftId,
    shiftName,
    onClose,
    onDeleted,
}) => {
    const theme = useDashboardTheme();
    const confirmed = useRef(false);

    useEffect(() => {
        Swal.fire({
            title: '¿Quitar turno?',
            html: `
                <div class="theme-${theme} p-2">
                  <div class="flex flex-col items-center mb-2">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full dashboard-background-error mb-2">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                        </svg>
                    </div>
                    <p class="text-gray-800 text-center mb-2">
                      Vas a quitar el turno <span class="font-bold">"${shiftName}"</span> a este empleado.
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
                                    <h2 class="text-2xl font-bold dashboard-text mb-1">Confirmar acción</h2>
                                    <p class="text-gray-800 text-center mb-2">
                                      Esta acción es <span class="font-bold dashboard-text-error">irreversible</span>.<br/><br/>
                                      ¿Estás seguro de que deseas quitar este turno al empleado?<br/><br/>
                                      <span class="text-red-600 font-semibold">Advertencia:</span> Si este empleado registró alguna asistencia de días con este turno, <span class="font-bold">será eliminada permanentemente</span>.
                                    </p>
                                  </div>
                                  <div class="flex justify-center space-x-4 mt-4">
                                    <button type="button" id="swal-cancel-final" class="px-5 py-2 dashboard-button-secondary text-white font-semibold transition-colors">Cancelar</button>
                                    <button type="button" id="swal-confirm" class="px-5 py-2 dashboard-button text-white font-semibold transition-colors bg-red-600 hover:bg-red-700">Quitar</button>
                                  </div>
                                </div>
                            `,
                            showConfirmButton: false,
                            showCancelButton: false,
                            didOpen: () => {
                                const confirmBtn = document.getElementById('swal-confirm');
                                const cancelBtn2 = document.getElementById('swal-cancel-final');
                                if (confirmBtn) {
                                    confirmBtn.addEventListener('click', async () => {
                                        Swal.fire({
                                            title: 'Quitando...',
                                            html: `<div class="theme-${theme} p-4 flex flex-col items-center"><div class="loader mb-2"></div><p>Quitando turno...</p></div>`,
                                            allowOutsideClick: false,
                                            allowEscapeKey: false,
                                            showConfirmButton: false,
                                            didOpen: () => {
                                                Swal.showLoading();
                                            }
                                        });
                                        try {
                                            const token = localStorage.getItem("token");
                                            const response = await axios.delete(`/api/turnos/shift/${userId}/${shiftId}`, {
                                                headers: { Authorization: `Bearer ${token}` }
                                            });
                                            confirmed.current = true;
                                            Swal.fire({
                                                html: `
                                                    <div class="theme-${theme} p-2">
                                                        <div class="flex flex-col items-center mb-2">
                                                            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
                                                                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                            <h2 class="text-2xl font-bold text-green-700 mb-1">Turno quitado</h2>
                                                            <p class="text-gray-800 text-center mb-2">
                                                                ${response.data?.message || "El turno fue quitado correctamente al empleado."}
                                                            </p>
                                                        </div>
                                                        <div class="flex justify-center mt-4">
                                                            <button type="button" id="swal-success-ok" class="px-5 py-2 dashboard-button text-white font-semibold transition-colors">OK</button>
                                                        </div>
                                                    </div>
                                                `,
                                                showConfirmButton: false,
                                                customClass: { confirmButton: "dashboard-button" },
                                                didOpen: () => {
                                                    const okBtn = document.getElementById('swal-success-ok');
                                                    if (okBtn) {
                                                        okBtn.addEventListener('click', () => {
                                                            Swal.close();
                                                            onDeleted(shiftId);
                                                            onClose();
                                                        });
                                                    }
                                                },
                                                willClose: () => {
                                                    if (!confirmed.current) onClose();
                                                }
                                            });
                                        } catch (error: any) {
                                            Swal.fire({
                                                html: `
                                                    <div class="theme-${theme} p-2">
                                                        <div class="flex flex-col items-center mb-2">
                                                            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2">
                                                                <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </div>
                                                            <h2 class="text-2xl font-bold text-red-700 mb-1">Error</h2>
                                                            <p class="text-gray-800 text-center mb-2">
                                                                ${error?.response?.data?.message || "No se pudo quitar el turno al empleado."}
                                                            </p>
                                                        </div>
                                                        <div class="flex justify-center mt-4">
                                                            <button type="button" id="swal-error-ok" class="px-5 py-2 dashboard-button-error text-white font-semibold transition-colors">OK</button>
                                                        </div>
                                                    </div>
                                                `,
                                                showConfirmButton: false,
                                                customClass: { confirmButton: "dashboard-button-error" },
                                                didOpen: () => {
                                                    const okBtn = document.getElementById('swal-error-ok');
                                                    if (okBtn) {
                                                        okBtn.addEventListener('click', () => {
                                                            Swal.close();
                                                            onClose();
                                                        });
                                                    }
                                                },
                                                willClose: () => {
                                                    if (!confirmed.current) onClose();
                                                }
                                            });
                                        }
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
    }, [userId, shiftId, shiftName, theme, onClose, onDeleted]);

    return null;
};

export default DeleteEmployeeTurnoAlert;
