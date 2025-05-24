import { FiUsers } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useGetEmployeesTurnosList } from "./useGetEmployeesTurnosList";
import { FaPlus,FaMinus, FaXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmployeesTurnosList = () => {
    const { id } = useParams<{ id: string }>();
    const employeeId = Number(id);
    const { loading, shifts, user, error } = useGetEmployeesTurnosList(employeeId);

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800 flex items-center">
                <FiUsers className="mr-3" />
                Lista de Turnos de Empleado
            </h1>

            <div className="mb-6 bg-gray-50 p-4 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="text-lg font-semibold text-gray-700">Nombre del empleado:</div>
                    <div className="text-gray-900">
                        {user ? `${user.first_name} ${user.last_name}` : ""}
                    </div>
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-700">RUT:</div>
                    <div className="text-gray-900">
                        {user ? `${user.rut}-${user.rut_dv}` : ""}
                    </div>
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-700">Rol en la empresa:</div>
                    <div className="text-gray-900">
                        {user ? (user.role?.name || "Desconocido") : ""}
                    </div>
                </div>
            </div>

            <div className="flex space-x-2 justify-start mt-4 mb-4">
                <Link to={`/dashboard/employees/${user?.id}/assign-shifts`} className="dashboard-button text-white px-4 py-2 text-sm transition-colors flex items-center">
                <FaPlus className="mr-2" />
                Asignar
                </Link>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <h1>Cargando...</h1>
                </div>
            ) : (
                <div className="bg-white shadow w-full overflow-x-auto">
                    <div className="max-h-96 overflow-y-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead className="sticky top-0 dashboard-background text-white uppercase text-sm tracking-wider">
                                <tr>
                                    <th className="px-4 py-3 text-left">Nombre del Turno</th>
                                    <th className="px-4 py-3 text-left">Descripción</th>
                                    <th className="px-4 py-3 text-left">Días</th>
                                    <th className="px-4 py-3 text-left">Hora Inicio</th>
                                    <th className="px-4 py-3 text-left">Almuerzo</th>
                                    <th className="px-4 py-3 text-left">Hora Fin</th>
                                    <th className="px-4 py-3 text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shifts.map((item, idx) => {
                                    let days: string[] = [];
                                    if (Array.isArray(item.shift_user.days)) {
                                        days = item.shift_user.days;
                                    } else if (typeof item.shift_user.days === "string") {
                                        try {
                                            days = JSON.parse(item.shift_user.days);
                                        } catch {
                                            days = [item.shift_user.days];
                                        }
                                    }
                                    return (
                                        <tr
                                            key={item.shift_user.id}
                                            className={`transition-colors ${idx % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`}
                                        >
                                            <td className="px-4 py-2">{item.shift.name}</td>
                                            <td className="px-4 py-2">{item.shift.description}</td>
                                            <td className="px-4 py-2">
                                                {days.map(day => (
                                                    <span key={day} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 text-xs">
                                                        {day}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2">{item.shift.start_time}</td>
                                            <td className="px-4 py-2">{item.shift.lunch_time}</td>
                                            <td className="px-4 py-2">{item.shift.end_time}</td>
                                            <td className="px-4 py-2">
                                            <div className="flex space-x-2">
                                                <Link to={`/dashboard/employees/${user?.id}/shift/${item.shift.id}/edit`} className="dashboard-button-secondary text-white px-4 py-2 text-sm transition-colors flex items-center">
                                                  <FaEdit className="mr-2" />
                                                    Editar
                                                </Link>
                                                <button className="text-white px-4 py-2 text-sm dashboard-button transition-colors flex items-center">
                                                  <FaMinus className="mr-2" />
                                                    Eliminar
                                                </button>
                                            </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {shifts.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-gray-500">
                                            No hay turnos asignados. Por favor, asigne un turno.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/employees" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>
        </div>
    );
};

export default EmployeesTurnosList;