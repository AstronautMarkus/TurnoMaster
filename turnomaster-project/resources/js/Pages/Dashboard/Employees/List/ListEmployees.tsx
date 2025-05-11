import React from "react";
import useGetEmployeesList from "./useGetEmployeesList";
import { Link } from "react-router-dom";
import AuthLoadingScreen from "../../../../Components/Auth/LoadingScreen/AuthLoadingScreen";

const ListEmployees: React.FC = () => {
  const { employees, page, setPage, totalPages, loading } = useGetEmployeesList();

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800">Lista de empleados</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Link to="/dashboard/employees/create" className="text-white px-4 py-2 bg-[#a91e1e] hover:bg-[#891818] transition-colors">Crear empleado</Link>
        </div>
        <input
          type="text"
          placeholder="Buscar empleado..."
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium w-64">Filtrar por rol:</span>
          <select className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/1 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="Todos">Todos</option>
            <option value="Administrador">Administrador</option>
            <option value="Empleado">Empleado</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow w-full overflow-x-auto">
        {loading ? ( 
          <div className="flex justify-center items-center h-48">
            <AuthLoadingScreen />
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <table className="table-auto w-full border-collapse">
              <thead className="sticky top-0 bg-[#7c1d1d] text-white uppercase text-sm tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">RUT</th>
                  <th className="px-4 py-3 text-left">Correo</th>
                  <th className="px-4 py-3 text-left">Rol</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-2 flex items-center space-x-4">
                      <img src={employee.image} alt={`${employee.first_name} ${employee.last_name}`} className="w-12 h-12" />
                      <span>{employee.first_name} {employee.last_name}</span>
                    </td>
                    <td className="px-4 py-2">{employee.rut}</td>
                    <td className="px-4 py-2">{employee.email}</td>
                    <td className="px-4 py-2">{employee.role}</td> {/* Display role string */}
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition-colors">Editar</button>
                        <button className="bg-red-700 text-white px-4 py-2 text-sm hover:bg-red-800 transition-colors">Borrar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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

export default ListEmployees;
