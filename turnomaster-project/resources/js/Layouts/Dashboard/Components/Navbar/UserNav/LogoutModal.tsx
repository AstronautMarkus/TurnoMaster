import React from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold text-gray-800">¿Estás seguro?</h2>
        <p className="text-sm text-gray-600 mt-2">
          ¿Estás seguro de que deseas cerrar sesión?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
