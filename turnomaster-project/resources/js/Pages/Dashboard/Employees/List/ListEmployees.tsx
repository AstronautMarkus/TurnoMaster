import React, { useState } from "react";
import useGetEmployeesList from "./useGetEmployeesList";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaSearch, FaEdit } from "react-icons/fa";
import { FaUserShield, FaUser } from 'react-icons/fa';
import { FaUserGear } from "react-icons/fa6";

const ListEmployees: React.FC = () => {
  const { employees, roles, page, setPage, totalPages, loading } = useGetEmployeesList();
  const [selectedRole, setSelectedRole] = useState<string>("Todos");
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<{ id: number; first_name: string; last_name: string } | null>(null);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const handleDeleteClick = (employee: { id: number; first_name: string; last_name: string }) => {
    setEmployeeToDelete(employee);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/employees/${employeeToDelete.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShowModal(false);
        setEmployeeToDelete(null);

        const index = employees.findIndex(emp => emp.id === employeeToDelete.id);
        if (index !== -1) {
          employees.splice(index, 1);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const filteredEmployees = selectedRole === "Todos"
    ? employees
    : employees.filter((employee) => employee.role === selectedRole);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800">Lista de empleados</h1>
      <p className="text-gray-600 mb-6 text-lg">Aquí puedes gestionar los empleados de tu empresa.</p>

      <div className="flex justify-between items-center mb-4">
        <Link to="/dashboard/employees/create" className="flex items-center text-white px-4 py-2 bg-[#a91e1e] hover:bg-[#891818] transition-colors">
          <FaPlus className="mr-2" />
          Crear empleado
        </Link>
        <div className="flex items-center space-x-2 w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Buscar empleado..."
            className="flex-grow px-4 py-2 h-10 focus:outline-none focus:ring-3 focus:ring-[#e01d1d] focus:border-[#e01d1d] hover:border-[#e01d1d]"
          />
          <button
            type="button"
            className="flex items-center text-white px-4 py-2 h-10 min-h-[2.5rem] bg-[#a91e1e] hover:bg-[#891818] transition-colors"
          >
            <FaSearch className="text-lg" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium w-64">Filtrar por rol:</span>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="border border-gray-300 px-4 py-2 w-full sm:w-1/1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos">Todos</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow w-full overflow-x-auto">
        {loading ? ( 
          <div className="flex justify-center items-center h-48">
            <h1>Cargando...</h1>
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
                {filteredEmployees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-2 flex items-center space-x-4">
                      <img src={employee.image} className="w-12 h-12 rounded-full" />
                      <span>{employee.first_name} {employee.last_name}</span>
                    </td>
                    <td className="px-4 py-2"><span>{employee.rut}</span></td>
                    <td className="px-4 py-2"><span>{employee.email}</span></td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center" style={{ marginRight: "0.5rem" }}>
                        {employee.role === "Admin" ? (
                          <FaUserShield style={{ fontSize: "1.2em" }} />
                        ) : employee.role === "Empleado" ? (
                          <FaUser style={{ fontSize: "1.2em" }} />
                        ) : (
                          <FaUserGear style={{ fontSize: "1.2em" }} />
                        )}
                      </span>
                      <span>{employee.role}</span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <Link to={`/dashboard/employees/edit/${employee.id}`} className="bg-gray-600 text-white px-4 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center">
                          <FaEdit className="mr-2" />
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(employee)}
                          className="bg-red-700 text-white px-4 py-2 text-sm hover:bg-red-800 transition-colors flex items-center"
                        >
                          <FaMinus className="mr-2" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">No se encontraron empleados. Por favor, presione "Crear empleado".</td>
                  </tr>
                )}
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

      {showModal && employeeToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 shadow-2xl border-4 border-red-700 w-full max-w-md">
            <div className="flex items-center mb-4">
              <span className="bg-red-700 text-white px-3 py-1 font-bold uppercase tracking-wider mr-3">⚠️Aviso</span>
              <h2 className="text-xl font-extrabold text-red-800">Eliminar empleado</h2>
            </div>
            <p className="text-gray-800 mb-2">
              Está a punto de eliminar al empleado <span className="font-bold">{employeeToDelete.first_name} {employeeToDelete.last_name}</span>.
            </p>
            <p className="text-gray-700 mb-4">
              Esta acción <span className="font-bold text-red-700">no se puede deshacer</span>. Todos los datos asociados a este empleado se perderán permanentemente.
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-colors"
                    >
                Cancelar
                    </button>
                    <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-700 text-white font-semibold hover:bg-red-800 transition-colors"
                    >
                Sí, borrar definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmployees;
