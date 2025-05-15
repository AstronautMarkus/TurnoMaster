import React from "react";

interface ModalProps {
    isOpen: boolean;
    message: string;
    isError: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, isError, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className={`bg-white shadow-lg p-6 transform transition-transform duration-300 ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <h2 className={`text-lg font-bold mb-4 ${isError ? "text-red-600" : "text-green-600"}`}>
                    {isError ? "Error" : "Éxito"}
                </h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-white bg-[#e01d1d] hover:bg-[#b21e1e] transition"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Modal;
