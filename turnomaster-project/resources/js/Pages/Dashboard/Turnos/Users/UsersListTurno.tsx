import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetTurnoDetailsList } from "./useGetTurnoDetailsList";
import { FaUserPlus, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import useAssignUsersToShift from "./useAssignUsersToShift";

const dayMap: Record<string, string> = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miercoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sabado",
    sunday: "Domingo",
};

const daysOfWeek = [
    { key: "L", label: "Lunes" },
    { key: "M", label: "Martes" },
    { key: "X", label: "Miercoles" },
    { key: "J", label: "Jueves" },
    { key: "V", label: "Viernes" },
    { key: "S", label: "Sabado" },
    { key: "D", label: "Domingo" },
];

const UsersListTurno = () => {
    const [page, setPage] = useState(1);
    const { loading, users, pagination, error, shift } = useGetTurnoDetailsList(page);

    // Modal hook logic
    const modal = useAssignUsersToShift();
    const dayLabels = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];


    const renderDays = (daysJson: string) => {
        try {
            const daysArr: string[] = JSON.parse(daysJson);
            return daysArr.map(day => dayMap[day] || day).join(", ");
        } catch {
            return "";
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800">Lista de empleados de "{shift?.name || "-"}"</h1>
            <p className="text-gray-600 mb-6 text-lg">Revisa los empleados con  este turno asignado.</p>

            <div className="flex justify-start mb-4">
                <button
                    className="text-white px-4 py-2 dashboard-button flex items-center"
                    onClick={modal.openModal}
                >
                    <FaUserPlus className="mr-2" />
                    Agregar emplado
                </button>
            </div>

            <div className="mb-6 bg-gray-50 p-4 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="text-lg font-semibold text-gray-700">Nombre del turno:</div>
                    <div className="text-gray-900">{shift?.name || "-"}</div>
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-700">Descripción:</div>
                    <div className="text-gray-900">{shift?.description || "-"}</div>
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-700">Hora de inicio:</div>
                    <div className="text-gray-900">{shift?.start_time || "-"}</div>
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-700">Hora de almuerzo:</div>
                    <div className="text-gray-900">{shift?.lunch_time || "-"}</div>
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-700">Hora de salida:</div>
                    <div className="text-gray-900">{shift?.end_time || "-"}</div>
                </div>
            </div>

            <div className="bg-white shadow w-full overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead className="sticky top-0 dashboard-background text-white uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Días aplicados</th>
                                <th className="px-4 py-3 text-left">¿Está activo?</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-3 text-center">Cargando...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-3 text-center text-red-500">{error}</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-3 text-center">No hay empleados asignados.</td>
                                </tr>
                            ) : (
                                users.map(({ shift_user, user }) => (
                                    <tr className="border-b hover:bg-gray-100" key={shift_user.id}>
                                        <td className="px-4 py-3">{user.first_name} {user.last_name}</td>
                                        <td className="px-4 py-3">{renderDays(shift_user.days)}</td>
                                        <td className="px-4 py-3">{shift_user.is_active ? "Sí" : "No"}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button
                                                className="text-white px-4 py-2 text-sm dashboard-button-warning transition-colors flex items-center"
                                                title="Editar"
                                            >
                                                <FaEdit className="mr-2" />
                                                Editar
                                            </button>
                                            <button
                                                className="text-white px-4 py-2 text-sm dashboard-button transition-colors flex items-center"
                                                title="Eliminar"
                                            >
                                                <FaMinus className="mr-2" />
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {users.length > 0 && (
                <div className="my-8">
                    <h2 className="text-lg font-bold mb-2">Mapa visual de días asignados</h2>
                    <div className="overflow-x-auto border">
                        <table className="min-w-max w-full text-sm text-center">
                            <thead>
                                <tr>
                                    <th className="p-2 bg-gray-100">Empleado</th>
                                    {dayLabels.map(day => (
                                        <th key={day} className="p-2 bg-gray-100">{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(({ user, shift_user }) => {
                                    let days: string[] = [];
                                    try { days = JSON.parse(shift_user.days); } catch {}
                                    const normalized = days.map(d => d.trim().toLowerCase());
                                    return (
                                        <tr key={shift_user.id}>
                                            <td className="p-2 text-white font-semibold dashboard-background">{user.first_name} {user.last_name}</td>
                                            {dayLabels.map(label => {
                                                const key = label.toLowerCase();
                                                const isAssigned = normalized.includes(key);
                                                return (
                                                    <td
                                                        key={label}
                                                        className={`p-2 ${isAssigned ? "dashboard-background-secondary text-white" : "bg-gray-200"}`}
                                                    >
                                                        <div className="flex justify-center items-center">
                                                            {isAssigned ? <FaCheck /> : ""}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


            {pagination && pagination.total > 0 && (
                <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-700">
                        Página {page} de {pagination.last_page}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className={`px-4 py-2 ${page === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === pagination.last_page}
                            className={`px-4 py-2 ${page === pagination.last_page ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/turnos" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>


            {modal.showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={modal.closeModal}
                        >
                            <FaXmark size={24} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            <FaUserPlus className="mr-2" />
                            Agregar usuario al turno
                        </h2>

                        {(modal.lastAssignStatus && modal.lastAssignMessage) && (
                            <div
                                className={`mb-4 px-3 py-2 ${
                                    modal.lastAssignStatus === "success"
                                        ? "dashboard-success text-black font-semibold"
                                        : "dashboard-error text-white font-semibold"
                                }`}
                            >
                                <div className="font-semibold mb-1">{modal.lastAssignMessage}</div>
                                {modal.lastAssignErrors && Array.isArray(modal.lastAssignErrors) && modal.lastAssignErrors.length > 0 && (
                                    <ul className="list-disc pl-5">
                                        {modal.lastAssignErrors.map((err, idx) => (
                                            <li key={idx}>{err}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        <div className="mb-4">
                            <span className="font-semibold mr-2">Días:</span>
                            {daysOfWeek.map(day => (
                                <button
                                    key={day.key}
                                    className={`mx-1 px-3 py-1 border ${modal.selectedDays.includes(day.key) ? "dashboard-button text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                                    onClick={() => modal.toggleDay(day.key)}
                                    type="button"
                                >
                                    {day.key}
                                </button>
                            ))}
                        </div>
                        
                        
                        <div>
                            <span className="font-semibold">Empleados disponibles:</span>

                            {modal.search && (
                                <div className="mt-2 text-sm text-gray-500">
                                    Resultados para: <span className="font-semibold">{modal.search}</span>
                                </div>
                            )}

                            <div className="mt-2 mb-2 flex gap-2">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                                    placeholder="Buscar empleado por nombre..."
                                    value={modal.searchInput}
                                    onChange={modal.handleSearchInputChange}
                                    onKeyDown={e => { if (e.key === "Enter") modal.handleSearch(); }}
                                />
                                <button
                                    className="px-3 py-2 text-white dashboard-button"
                                    onClick={modal.handleSearch}
                                    type="button"
                                >
                                    Buscar
                                </button>
                                <button
                                    className="px-3 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400"
                                    onClick={modal.handleClearSearch}
                                    type="button"
                                    disabled={!modal.search && !modal.searchInput}
                                >
                                    Limpiar
                                </button>
                            </div>
                            <div className="mt-2 max-h-40 overflow-y-auto">
                                {modal.employeesLoading ? (
                                    <div className="flex justify-center items-center py-8">
                                        <span className="text-gray-500">Cargando empleados...</span>
                                    </div>
                                ) : (
                                    <ul>
                                        {modal.employees.map(user => (
                                            <li key={user.id} className="flex items-center py-1">
                                                <input
                                                    type="radio"
                                                    name="user-select"
                                                    checked={modal.selectedUsers.includes(user.id)}
                                                    onChange={() => modal.handleUserSelect(user.id)}
                                                    className="mr-2"
                                                />
                                                <span>{user.first_name} {user.last_name}</span>
                                                {modal.assignResults[user.id]?.status === "success" && (
                                                    <FaCheckCircle className="ml-2 text-green-500" title="Asignado correctamente" />
                                                )}
                                                {modal.assignResults[user.id]?.status === "error" && (
                                                    <FaTimesCircle className="ml-2 text-red-500" title="Error al asignar" />
                                                )}
                                            </li>
                                        ))}
                                        {modal.employees.length === 0 && (
                                            <li className="text-gray-500 py-2">No hay empleados disponibles.</li>
                                        )}
                                    </ul>
                                )}
                            </div>

                            <div className="mb-4 flex flex-col items-center justify-center">
                                <span className="mt-2 font-semibold text-center">Activar turno inmediatamente</span>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-black mr-4">No</span>
                                    <div
                                        onClick={modal.toggleIsActiveSwitch}
                                        className={`relative inline-flex h-6 w-11 items-center cursor-pointer transition-colors duration-300 ${
                                            modal.isActiveSwitch ? "dashboard-button-secondary" : "dashboard-button"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform bg-white transition-transform duration-300 ${
                                                modal.isActiveSwitch ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-black ml-4">Sí</span>
                                </div>
                            </div>

                            {modal.employeesPagination && modal.employeesPagination.total > 0 && (
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-700 text-xs">
                                        Página {modal.employeesPagination.current_page} de {modal.employeesPagination.last_page}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => modal.handleModalPageChange(modal.modalPage - 1)}
                                            disabled={modal.modalPage === 1 || modal.employeesLoading}
                                            className={`px-2 py-1 text-xs ${modal.modalPage === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                                        >
                                            Anterior
                                        </button>
                                        <button
                                            onClick={() => modal.handleModalPageChange(modal.modalPage + 1)}
                                            disabled={modal.modalPage === modal.employeesPagination.last_page || modal.employeesLoading}
                                            className={`px-2 py-1 text-xs ${modal.modalPage === modal.employeesPagination.last_page ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 mr-2"
                                onClick={modal.closeModal}
                                disabled={modal.assignLoading}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-4 py-2 dashboard-button text-white"
                                onClick={modal.assignUsers}
                                disabled={modal.assignLoading || modal.selectedUsers.length === 0 || modal.selectedDays.length === 0}
                            >
                                {modal.assignLoading ? "Asignando..." : "Asignar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UsersListTurno;