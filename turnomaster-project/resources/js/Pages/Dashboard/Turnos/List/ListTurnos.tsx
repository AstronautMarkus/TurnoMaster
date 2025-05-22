import { Link } from "react-router-dom";

const staticTurnos = [
];

const ListTurnos = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800">Lista de Turnos</h1>
            <p className="text-gray-600 mb-6 text-lg">Aquí puedes gestionar los turnos de los empleados.</p>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <Link to="/dashboard/employees/create" className="text-white px-4 py-2 bg-[#a91e1e] hover:bg-[#891818] transition-colors">Crear Turno</Link>
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
                                </tr>
                            ))}
                            {staticTurnos.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
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