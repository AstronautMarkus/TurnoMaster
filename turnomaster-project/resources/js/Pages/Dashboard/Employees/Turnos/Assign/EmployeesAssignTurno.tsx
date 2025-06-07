import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetEmployeeData } from "./useGetEmployeeData";
import { useGetTurnos, Turno } from "./useGetTurnos";

const weekDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

const PAGE_SIZE = 10;

const EmployeesAssignTurno = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [assignedPage, setAssignedPage] = useState(1);

    const { employee, assignedShifts, loading, error, pagination } = useGetEmployeeData(assignedPage, PAGE_SIZE);
    const { turnos, loading: turnosLoading, error: turnosError, pagination: turnosPagination } = useGetTurnos(page, PAGE_SIZE);

    const [searchInput, setSearchInput] = useState("");
    const [searchName, setSearchName] = useState("");

    const filteredTurnos = turnos.filter(t =>
        !searchName || t.name.toLowerCase().includes(searchName.toLowerCase())
    );
    const totalPages = turnosPagination.last_page;

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);
    const handleSearch = () => { setSearchName(searchInput); setPage(1); };
    const handleClearSearch = () => { setSearchInput(""); setSearchName(""); setPage(1); };
    const handlePrevious = () => { if (page > 1) setPage(page - 1); };
    const handleNext = () => { if (page < totalPages) setPage(page + 1); };

    const handleTurnoClick = (turno: Turno) => {
        setSelectedTurno(turno);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTurno(null);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-left mb-2 mt-4 text-gray-800 flex items-center">
                        <FiUsers className="mr-3" />
                        Asignar Turno a Empleado
                    </h1>
                    <p className="text-gray-600 mb-6 text-lg">
                        {employee ? `${employee.first_name} ${employee.last_name}` : ""}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                <div className="flex flex-col gap-2 w-full sm:w-1/3 ml-auto">
                    <div className="flex items-center space-x-2 w-full">
                        <input
                            type="text"
                            placeholder="Buscar turno..."
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            className="flex-grow px-4 py-2 h-10 focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="flex items-center text-white px-4 py-2 h-10 min-h-[2.5rem] dashboard-button transition-colors"
                        >
                            <FaSearch className="text-lg" />
                        </button>
                        {searchName && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="flex items-center text-white px-2 py-2 h-10 min-h-[2.5rem] bg-gray-500 hover:bg-gray-600 transition-colors"
                                title="Limpiar búsqueda"
                            >
                                <FaXmark className="text-lg" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white shadow w-full overflow-x-auto">
                <div className="max-h-96 overflow-y-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead className="sticky top-0 dashboard-background text-white uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Descripción</th>
                                <th className="px-4 py-3 text-left">Horario</th>
                                <th className="px-4 py-3 text-left">Almuerzo</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnosLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        Cargando turnos...
                                    </td>
                                </tr>
                            ) : turnosError ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-red-500">
                                        {turnosError}
                                    </td>
                                </tr>
                            ) : filteredTurnos.length > 0 ? (
                                filteredTurnos.map((turno) => (
                                    <tr key={turno.id} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-4 py-2">{turno.name}</td>
                                        <td className="px-4 py-2">{turno.description}</td>
                                        <td className="px-4 py-2">
                                            {turno.start_time} - {turno.end_time}
                                        </td>
                                        <td className="px-4 py-2">
                                            {turno.has_lunch ? "Sí" : "No"}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="dashboard-button-success text-black font-semibold px-4 py-2 text-sm transition-colors"
                                                onClick={() => handleTurnoClick(turno)}
                                            >
                                                Asignar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No se encontraron turnos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4 mb-4">
                <span className="text-gray-700">Página {turnosPagination.current_page} de {turnosPagination.last_page}</span>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePrevious}
                        disabled={turnosPagination.current_page === 1}
                        className={`px-4 py-2 ${turnosPagination.current_page === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={turnosPagination.current_page === turnosPagination.last_page}
                        className={`px-4 py-2 ${turnosPagination.current_page === turnosPagination.last_page ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-4">
                <div className="w-full sm:w-1/2 bg-white shadow p-6 flex items-center gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-400 overflow-hidden">
                            <FiUsers />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Empleado</h2>
                        {loading ? (
                            <div className="text-gray-500">Cargando datos del empleado...</div>
                        ) : error ? (
                            <div className="text-red-500">{error}</div>
                        ) : employee ? (
                            <>
                                <div className="mb-2">
                                    <span className="font-semibold">Nombre: </span>
                                    {employee.first_name} {employee.last_name}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Puesto: </span>
                                    {employee.role?.name}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Email: </span>
                                    {employee.email}
                                </div>
                                <div>
                                    <span className="font-semibold">RUT: </span>
                                    {employee.rut}-{employee.rut_dv}
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-500">No se encontraron datos del empleado.</div>
                        )}
                    </div>
                </div>
                <div className="w-full sm:w-1/2 bg-white shadow p-6 flex flex-col">
                    <h2 className="text-xl font-bold mb-4">
                        Turnos asignados {employee ? `a ${employee.first_name}` : ""}
                    </h2>
                    {loading ? (
                        <div className="text-gray-500">Cargando turnos...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : assignedShifts && assignedShifts.length > 0 ? (
                        <>
                            <ul className="divide-y divide-gray-200">
                                {assignedShifts.map((item) => {
                                    const days: string[] = (() => {
                                        try {
                                            return JSON.parse(item.shift_user.days);
                                        } catch {
                                            return [];
                                        }
                                    })();
                                    return (
                                        <li key={item.shift_user.id} className="py-2">
                                            <div className="font-semibold">{item.shift.name}</div>
                                            <div className="text-sm text-gray-600">{item.shift.description}</div>
                                            <div className="text-xs text-gray-500">
                                                {item.shift.start_time} - {item.shift.end_time}
                                            </div>
                                            <div className="text-xs text-gray-700 mt-1">
                                                <span className="font-semibold">Días: </span>
                                                {days.length > 0 ? days.join(", ") : "No asignado"}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-gray-700">
                                    Página {pagination.current_page} de {pagination.last_page}
                                </span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setAssignedPage(p => Math.max(1, p - 1))}
                                        disabled={pagination.current_page === 1}
                                        className={`px-4 py-2 ${pagination.current_page === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        onClick={() => setAssignedPage(p => Math.min(pagination.last_page, p + 1))}
                                        disabled={pagination.current_page === pagination.last_page}
                                        className={`px-4 py-2 ${pagination.current_page === pagination.last_page ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-gray-500">No tiene turnos asignados.</div>
                    )}
                </div>
            </div>

            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/employees" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white shadow-lg p-8 w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        <h3 className="text-lg font-bold mb-4">
                            Selecciona los días para: {selectedTurno?.name}
                        </h3>
                        <div className="flex flex-col gap-2">
                            {weekDays.map((day) => (
                                <label key={day} className="flex items-center gap-2">
                                    <input type="checkbox" disabled />
                                    {day}
                                </label>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                className="bg-blue-600 text-white px-4 py-2"
                                disabled
                            >
                                Asignar Turno
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeesAssignTurno;