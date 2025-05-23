import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetTurnoDetailsList } from "./useGetTurnoDetailsList";

const dayMap: Record<string, string> = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
};

const UsersListTurno = () => {
    const [page, setPage] = useState(1);
    const { loading, users, pagination, error, shift } = useGetTurnoDetailsList(page);

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
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800">Lista de usuarios</h1>
            <p className="text-gray-600 mb-6 text-lg">Revisa los usuarios con  este turno asignado.</p>

            

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
                                    <td colSpan={4} className="px-4 py-3 text-center">No hay usuarios asignados.</td>
                                </tr>
                            ) : (
                                users.map(({ shift_user, user }) => (
                                    <tr className="border-b hover:bg-gray-100" key={shift_user.id}>
                                        <td className="px-4 py-3">{user.first_name} {user.last_name}</td>
                                        <td className="px-4 py-3">{renderDays(shift_user.days)}</td>
                                        <td className="px-4 py-3">{shift_user.is_active ? "Sí" : "No"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

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
        </div>
    );
};
export default UsersListTurno;