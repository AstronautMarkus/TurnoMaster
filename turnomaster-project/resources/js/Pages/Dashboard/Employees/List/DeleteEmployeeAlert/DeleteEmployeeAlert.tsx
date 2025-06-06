import React, { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import useDashboardTheme from "../../../../../hooks/themes/useDashboardTheme";

interface DeleteEmployeeAlertProps {
  employee: { id: number; first_name: string; last_name: string };
  onDeleted?: () => void;
}

const DeleteEmployeeAlert: React.FC<DeleteEmployeeAlertProps> = ({ employee, onDeleted }) => {
  const theme = useDashboardTheme();

  useEffect(() => {
    Swal.fire({
      title: '¿Eliminar empleado?',
      html: `
        <div class="theme-${theme} p-2">
          <div class="flex flex-col items-center mb-2">
            <div class="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 mb-2">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
            </div>
            <h2 class="text-xl font-bold text-yellow-700 mb-1">¿Estás seguro?</h2>
            <p class="text-gray-800 text-center mb-2">
              Vas a eliminar a <span class="font-bold">${employee.first_name} ${employee.last_name}</span>.
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
        const swalNext = document.getElementById('swal-next');
        const swalCancel = document.getElementById('swal-cancel');

        if (swalNext) {
          swalNext.addEventListener('click', () => {
            Swal.fire({
              title: '',
              html: `
                <div class="theme-${theme} p-2">
                  <div class="flex flex-col items-center mb-2">
                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2">
                      <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                      </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-red-700 mb-1">Confirmar eliminación</h2>
                    <p class="text-gray-800 text-center mb-2">
                      Esta acción es <span class="font-bold text-red-600">irreversible</span>.
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
                const swalConfirm = document.getElementById('swal-confirm');
                const swalCancelFinal = document.getElementById('swal-cancel-final');

                if (swalConfirm) {
                  swalConfirm.addEventListener('click', async () => {
                    Swal.showLoading();
                    try {
                      const token = localStorage.getItem('token');
                      const response = await axios.delete(`/api/employees/${employee.id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                      Swal.hideLoading();
                      Swal.close();
                      await Swal.fire({
                        icon: undefined,
                        title: '',
                        html: `
                          <div class="theme-${theme} p-2">
                            <div class="flex flex-col items-center mb-2">
                              <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
                                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <h2 class="text-2xl font-bold text-green-700 mb-1">Empleado eliminado</h2>
                              <p class="text-gray-800 text-center mb-2">
                                ${response.data?.message || "El empleado fue eliminado correctamente."}
                              </p>
                            </div>
                          </div>
                        `,
                        timer: 1800,
                        showConfirmButton: false,
                      });
                      if (onDeleted) onDeleted();
                    } catch (error: any) {
                      Swal.hideLoading();
                      Swal.close();
                      Swal.fire({
                        icon: undefined,
                        title: '',
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
                                ${error.response?.data?.message || error.message || "No se pudo eliminar el empleado."}
                              </p>
                            </div>
                            <div class="flex justify-center mt-4">
                              <button type="button" id="swal-error-ok" class="px-5 py-2 dashboard-button text-white font-semibold transition-colors bg-red-600 hover:bg-red-700">OK</button>
                            </div>
                          </div>
                        `,
                        showConfirmButton: false,
                        didOpen: () => {
                          const okBtn = document.getElementById('swal-error-ok');
                          if (okBtn) {
                            okBtn.addEventListener('click', () => {
                              Swal.close();
                            });
                          }
                        },
                      });
                    }
                  });
                }

                if (swalCancelFinal) {
                  swalCancelFinal.addEventListener('click', () => {
                    Swal.close();
                  });
                }
              },
            });
          });
        }

        if (swalCancel) {
          swalCancel.addEventListener('click', () => {
            Swal.close();
          });
        }
      },
    });
  }, [employee, theme]);

  return null;
};

export default DeleteEmployeeAlert;
