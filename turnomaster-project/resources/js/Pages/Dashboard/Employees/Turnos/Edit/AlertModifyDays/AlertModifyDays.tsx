import React, { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import useDashboardTheme from "../../../../../../hooks/themes/useDashboardTheme";
interface AlertModifyDaysProps {
    turnoName: string;
    employeeName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const AlertModifyDays: React.FC<AlertModifyDaysProps> = ({
    turnoName,
    employeeName,
    onConfirm,
    onCancel,
}) => {
    const theme = useDashboardTheme();
    const confirmed = useRef(false);

    useEffect(() => {
        Swal.fire({
            title: "¿Quitar todos los días del turno?",
            html: `
                <div class="theme-${theme} p-2">
                  <div class="flex flex-col items-center mb-2">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full dashboard-background-error mb-2">
                        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                        </svg>
                    </div>
                    <p class="text-gray-800 text-center mb-2">
                      Vas a quitar <b>todos los días</b> del turno <span class="font-bold">"${turnoName}"</span> para <span class="font-bold">${employeeName}</span>.
                    </p>
                    <p class="text-red-700 text-center mb-2">
                      <b>Advertencia:</b> Los registros de asistencia de esos días se <b>perderán permanentemente</b>.
                    </p>
                  </div>
                  <div class="flex justify-center space-x-4 mt-4">
                    <button type="button" id="swal-cancel" class="px-5 py-2 dashboard-button-secondary text-white font-semibold transition-colors">Cancelar</button>
                    <button type="button" id="swal-confirm" class="px-5 py-2 dashboard-button text-white font-semibold transition-colors bg-yellow-600 hover:bg-yellow-700">Continuar</button>
                  </div>
                </div>
            `,
            showConfirmButton: false,
            showCancelButton: false,
            didOpen: () => {
                const confirmBtn = document.getElementById("swal-confirm");
                const cancelBtn = document.getElementById("swal-cancel");
                if (confirmBtn) {
                    confirmBtn.addEventListener("click", () => {
                        confirmed.current = true;
                        Swal.close();
                        onConfirm();
                    });
                }
                if (cancelBtn) {
                    cancelBtn.addEventListener("click", () => {
                        Swal.close();
                        onCancel();
                    });
                }
            },
            willClose: () => {
                if (!confirmed.current) onCancel();
            }
        });

        return () => {
            Swal.close();
        };
    }, [turnoName, employeeName, theme, onConfirm, onCancel]);

    return null;
};

export default AlertModifyDays;
