import { useEffect } from "react";
import Swal from "sweetalert2";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    Swal.fire({
      html: `
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">¿Cerrar sesión?</h2>
        <p class="text-base text-gray-600 mb-6 text-center">¿Seguro que deseas cerrar sesión?</p>
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
      popup: "rounded-xl p-0",
      confirmButton: "px-5 py-2 text-sm font-medium text-white bg-reyes-light rounded hover:bg-reyes-light-active ml-2",
      cancelButton: "px-5 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 mr-2",
      actions: "flex gap-3 w-full justify-center mb-4"
      },
      buttonsStyling: false,
      allowOutsideClick: true,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
      onConfirm();
      } else {
      onClose();
      }
    });
  }, [isOpen]);

  return null;
}
