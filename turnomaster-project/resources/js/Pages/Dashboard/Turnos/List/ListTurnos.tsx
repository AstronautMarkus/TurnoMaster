import { Link } from "react-router-dom";
import React from "react";
import { FaCalendar, FaEdit, FaPlus, FaSearch} from "react-icons/fa";
import { FaMinus, FaXmark } from "react-icons/fa6";

const staticTurnos = [
    {
        id: 1,
        name: "Turno Mañana",
        description: "Turno de mañana para empleados de oficina.",
        start_time: "08:00",
        lunch_time: "12:00",
        end_time: "17:00",
    }
];

const ListTurnos = () => {

    const [searchInput, setSearchInput] = React.useState<string>("");

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    const handleSearch = () => {};
    const handleClearSearch = () => {
        setSearchInput("");
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800 flex items-center">
                <FaCalendar className="mr-3" />
                Lista de Turnos
            </h1>
            <p className="text-gray-600 mb-6 text-lg">Aquí puedes gestionar los turnos de los empleados.</p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                <div className="w-full sm:w-auto">
                    <Link
                        to="/dashboard/employees/create"
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
                        {searchInput && (
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
                                <th className="px-4 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staticTurnos.map((turno, idx) => (
                                <tr key={idx} className="hover:bg-gray-100 transition-colors">
                                    <td className="px-4 py-2">{turno.name}</td>
                                    <td className="px-4 py-2">{turno.description}</td>
                                    <td className="px-4 py-2">{turno.start_time}</td>
                                    <td className="px-4 py-2">{turno.lunch_time}</td>
                                    <td className="px-4 py-2">{turno.end_time}</td>
                                    <td className="px-4 py-2">
                                        <Link
                                            to={`/dashboard/turnos/${turno.id}/users`}
                                            className="inline-block bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 text-sm font-medium transition-colors"
                                            style={{ minWidth: "40px", textAlign: "center" }}
                                        >
                                            {Math.floor(Math.random() * 100)} - Revisar lista
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">
                                                          <div className="flex space-x-2">
                                                            <Link to={`/dashboard/employees/edit/}`} className="bg-gray-600 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center">
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
                            ))}
                            {staticTurnos.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-gray-500">
                                        No se encontraron turnos. Por favor, presione "Crear Turno".
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default ListTurnos;