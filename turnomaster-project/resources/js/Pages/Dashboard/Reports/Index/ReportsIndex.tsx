import React from "react";
import { FaClipboardCheck, FaClipboardList, FaExclamationTriangle, FaRegListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReportsIndex: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">TurnoMaster - Asistencia y Reportes</h1>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-grow bg-white shadow-md sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div className="col-span-full">
                            <h2 className="text-2xl font-bold text-center mb-4 mt-8">Seleccione una opción</h2>
                        </div>

                        <div className="bg-gray-50 p-4 shadow-sm flex flex-col gap-4 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                <FaClipboardCheck className="text-blue-500" /> Asistencia y registro diario
                            </h2>
                            <p className="text-gray-600 text-sm mb-2">
                                Registra tu asistencia diaria o revisa tu historial de asistencias anteriores.
                            </p>
                            <Link to="/dashboard/attendance/register" className="dashboard-button text-white bg-blue-600 hover:bg-blue-700 p-3 flex items-center gap-3 transition-colors">
                                <FaClipboardCheck className="text-2xl" />
                                <span>Registrar asistencia</span>
                            </Link>
                            <Link to="/dashboard/attendance/review" className="dashboard-button text-white bg-blue-500 hover:bg-blue-600 p-3 flex items-center gap-3 transition-colors">
                                <FaClipboardList className="text-2xl" />
                                <span>Revisar asistencia</span>
                            </Link>
                        </div>

                        <div className="bg-gray-50 p-4 shadow-sm flex flex-col gap-4 border border-gray-200">
                            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                <FaExclamationTriangle className="text-yellow-500" /> Reportes y justificación de incidencias
                            </h2>
                            <p className="text-gray-600 text-sm mb-2">
                                Justifica una ausencia, solicita un cambio o revisa el historial de reportes realizados.
                            </p>
                            <Link to="/dashboard/reports/new" className="dashboard-button-success text-white bg-yellow-600 hover:bg-yellow-700 p-3 flex items-center gap-3 transition-colors">
                                <FaExclamationTriangle className="text-2xl" />
                                <span>Reportar incidente</span>
                            </Link>
                            <Link to="/dashboard/reports/list" className="dashboard-button-success text-white bg-yellow-500 hover:bg-yellow-600 p-3 flex items-center gap-3 transition-colors">
                                <FaRegListAlt className="text-2xl" />
                                <span>Lista de reportes</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <Link
                    to="/dashboard"
                    className="px-4 py-2 text-white dashboard-button transition-colors"
                >
                    Salir
                </Link>
            </div>
        </div>
    );
};

export default ReportsIndex;