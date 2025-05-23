import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaCalendar, FaEdit, FaPlus, FaSearch} from "react-icons/fa";
import { FaMinus, FaXmark } from "react-icons/fa6";
import useGetTurnosList from "./useGetTurnosList";

const ListTurnos = () => {
    const { turnos, page, setPage, totalPages, loading, searchName, search, clearSearch} = useGetTurnosList();

    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchInput(e.target.value); };

    const handleSearch = () => { search(searchInput);};

    const handleClearSearch = () => { setSearchInput(""); clearSearch();};

    const handlePrevious = () => { if (page > 1) setPage(page - 1); };

    const handleNext = () => { if (page < totalPages) setPage(page + 1); };

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800 flex items-center">
                <FaCalendar className="mr-3" />
                Lista de Turnos
            </h1>
            <p className="text-gray-600 mb-6 text-lg">Administra los turnos asignados a los empleados.</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                <div className="w-full sm:w-auto">
                    <Link
                        to="/dashboard/turnos/create"
                        className="flex items-center justify-center w-full sm:w-auto text-white px-4 py-2 bg-[#a91e1e] hover:bg-[#891818] transition-colors"
                    >
                        <FaPlus className="mr-2" />
                        Crear Turno
                    </Link>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-1/3">
                    <div className="flex items-center space-x-2 w-full">
                        <input
                            type="text"
                            placeholder="Buscar turno..."
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            className="flex-grow px-4 py-2 h-10 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="flex items-center text-white px-4 py-2 h-10 min-h-[2.5rem] bg-[#a91e1e] hover:bg-[#891818] transition-colors"
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
                        <thead className="sticky top-0 bg-[#7c1d1d] text-white uppercase text-sm tracking-wider">
                            <tr>
                                <th className="px-4 py-3 text-left">Nombre</th>
                                <th className="px-4 py-3 text-left">Descripción</th>
                                <th className="px-4 py-3 text-left">Hora Inicio</th>
                                <th className="px-4 py-3 text-left">Hora Almuerzo</th>
                                <th className="px-4 py-3 text-left">Hora Fin</th>
                                <th className="px-4 py-3 text-left">Usuarios asignados</th>
                                <th className="px-4 py-3 text-left">Fecha creación</th>
                                <th className="px-4 py-3 text-left">Fecha actualización</th>
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500">
                                        Cargando turnos...
                                    </td>
                                </tr>
                            ) : turnos.length > 0 ? (
                                turnos.map((turno, idx) => (
                                    <tr key={turno.id} className="hover:bg-gray-100 transition-colors">
                                        <td className="px-4 py-2"><span>{turno.name}</span></td>
                                        <td className="px-4 py-2"><span>{turno.description}</span></td>
                                        <td className="px-4 py-2"><span>{turno.start_time}</span></td>
                                        <td className="px-4 py-2"><span>{turno.lunch_time}</span></td>
                                        <td className="px-4 py-2"><span>{turno.end_time}</span></td>
                                        <td className="px-4 py-2">
                                            <Link
                                                to={`/dashboard/turnos/${turno.id}/users`}
                                                className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 text-sm font-medium transition-colors"
                                                style={{ minWidth: "40px", textAlign: "center" }}
                                            >
                                                <span>Revisar lista</span>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span>{new Date(turno.created_at).toLocaleString()}</span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <span>{turno.updated_at ? new Date(turno.updated_at).toLocaleString() : '--'}</span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex space-x-2">
                                                <Link to={`/dashboard/turnos/edit/${turno.id}`} className="bg-gray-600 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center">
                                                    <FaEdit className="mr-2" />
                                                    Editar
                                                </Link>
                                                <button
                                                    className="bg-red-700 text-white px-4 py-2 text-sm hover:bg-red-800 transition-colors flex items-center"
                                                >
                                                    <FaMinus className="mr-2" />
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-4 text-gray-500">
                                        No se encontraron turnos. Por favor, presione "Crear Turno".
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700">Página {page} de {totalPages}</span>
                <div className="flex space-x-2">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className={`px-4 py-2 ${page === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                >
                    Anterior
                </button>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-4 py-2 ${page === totalPages ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"} transition-colors`}
                >
                    Siguiente
                </button>
                </div>
            </div>
        </div>
    );
};
export default ListTurnos;