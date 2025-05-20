import React from "react";

interface ExitModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white shadow-lg p-6 w-full max-w-xs text-center">
      <h2 className="text-lg font-semibold mb-4">¿Quieres salir?</h2>
      <p className="mb-6 text-gray-600">Perderás cualquier cambio no guardado.</p>
      <div className="flex justify-center gap-4">
        <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700" onClick={onCancel}>
          Cancelar
        </button>
        <button className="px-4 py-2 bg-[#e01d1d] hover:bg-[#b21e1e] text-white focus:outline-none focus:ring-2 focus:ring-[#e01d1d]" onClick={onConfirm}>
          Salir
        </button>
      </div>
    </div>
  </div>
);

export default ExitModal;
