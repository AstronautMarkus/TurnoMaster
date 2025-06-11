import React, { useState } from "react";
import useGetEmployeesList from "./useGetEmployeesList";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaSearch, FaEdit, FaLock } from "react-icons/fa";
import { FaUserShield, FaUser, FaTimes } from 'react-icons/fa';
import { FaUserGear } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import DeleteEmployeeAlert from "./DeleteEmployeeAlert/DeleteEmployeeAlert";
import AccesDeniedAlert from "./AccesDeniedAlert/AccesDeniedAlert";
import CrossCompanyAlert from "./CrossCompanyAlert/CrossCompanyAlert";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
}

const ListEmployees = () => {
  const { employees, roles, page, setPage, totalPages, loading, setSearchName } = useGetEmployeesList();
  const [selectedRole, setSelectedRole] = useState<string>("Todos");
  const [searchInput, setSearchInput] = useState<string>("");
  const [employeeToDelete, setEmployeeToDelete] = useState<{ id: number; first_name: string; last_name: string; shift_count: number } | null>(null);
  const location = useLocation();
  const showAccessDenied = new URLSearchParams(location.search).has("unauthorized");
  const showCrossCompany = new URLSearchParams(location.search).has("cross_company");
  
    
  let userType: string | undefined = undefined;
  let userId: number | undefined = undefined;
  let userRoleId: number | undefined = undefined;
  const token = localStorage.getItem('token');
  if (token) {
    const payload = parseJwt(token);
    userType = payload.user_type;
    userId = payload.user_id;
    userRoleId = payload.role_id;
  }
  
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };
  
  const handleDeleteClick = (employee: { id: number; first_name: string; last_name: string; shift_count: number }) => {
    setEmployeeToDelete(employee);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };


  const handleSearch = () => {
    setPage(1);
    setSearchName(searchInput.trim());
  };


  const handleClearSearch = () => {
    setSearchInput("");
    setPage(1);
    setSearchName("");
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

  const canEditOrDelete = (employee: any) => {
    if (userType === "company") return true;
    if (userType === "employee") {
      if (userRoleId === 1) {
        // admin (1) can edit/delete anyone except other admins
        return employee.role_id !== 1;
      }
      if (userRoleId === 2) {
        // rrhh (2) only can edit/delete employees (3)
        return employee.role_id === 3;
      }
      // Employees (3) cannot edit or delete anyone
      return false;
    }
    return false;
  };

  return (
    <div className="p-6">
      {showAccessDenied && <AccesDeniedAlert />}
      {showCrossCompany && <CrossCompanyAlert />}
      <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4 text-gray-800 flex items-center">
        <FiUsers className="mr-3" />
        Lista de empleados
      </h1>
      <p className="text-gray-600 mb-6 text-lg">Aquí puedes gestionar los empleados de tu empresa.</p>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="w-full sm:w-auto">
          <Link
            to="/dashboard/employees/create"
            className="flex items-center justify-center w-full sm:w-auto text-white px-4 py-2 dashboard-button transition-colors"
          >
            <FaPlus className="mr-2" />
            Crear empleado
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-1/3">
          <div className="flex items-center space-x-2 w-full">
            <input
              type="text"
              placeholder="Buscar empleado..."
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
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium w-64 sm:w-auto">Filtrar por rol:</span>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="border border-gray-300 px-4 py-2 w-full sm:w-1/1 focus:ring-3 focus:ring-black focus:border-black hover:border-black"
            >
              <option value="Todos">Todos</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>
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
              <thead className="sticky top-0 dashboard-background text-white uppercase text-sm tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">RUT</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Rol</th>
                  <th className="px-4 py-3 text-left">T. Asignados</th>
                  <th className="px-4 py-3 text-left">A. Turnos</th>
                  <th className="px-4 py-3 text-left">Editar / Eliminar</th>
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
                      <span>
                        {employee.role === "Recursos Humanos (RR. HH.)" ? "RR.HH" : employee.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center mr-2">
                        {employee.has_shift ? "Sí" : "No"}
                      </span>
                        {employee.shift_count > 0 && (
                        <span className="inline-flex items-center">
                          <span>({employee.shift_count})</span>
                        </span>
                        )}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <Link
                          to={`/dashboard/employees/${employee.id}/assign-shifts`}
                          className="dashboard-button-secondary text-white px-4 py-2 text-sm transition-colors flex items-center"
                        >
                          <FaPlus />
                        </Link>
                        {employee.shift_count > 0 && (
                          <Link
                            to={`/dashboard/employees/${employee.id}/shifts`}
                            className="dashboard-button-success text-black font-semibold px-4 py-2 text-sm transition-colors flex items-center"
                          >
                            <FaSearch className="mr-2" />
                            Listar
                          </Link>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        {canEditOrDelete(employee) ? (
                          <>
                            <Link to={`/dashboard/employees/edit/${employee.id}`} className="dashboard-button-warning text-white px-4 py-2 text-sm transition-colors flex items-center">
                              <FaEdit />
                            </Link>
                            {userType === "employee" && userId === employee.id ? (
                              <button
                                className="bg-gray-400 cursor-not-allowed text-white px-4 py-2 text-sm flex items-center"
                                disabled
                              >
                                <FaLock />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleDeleteClick({
                                  id: employee.id,
                                  first_name: employee.first_name,
                                  last_name: employee.last_name,
                                  shift_count: employee.shift_count
                                })}
                                className="text-white px-4 py-2 text-sm dashboard-button transition-colors flex items-center"
                              >
                                <FaMinus />
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            className="bg-gray-400 cursor-not-allowed text-white px-4 py-2 text-sm flex items-center"
                            disabled
                          >
                            <FaLock />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">No se encontraron empleados. Por favor, presione "Crear empleado".</td>
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

      {employeeToDelete && (
        <DeleteEmployeeAlert
          employee={employeeToDelete}
          onDeleted={() => {
            const index = employees.findIndex(emp => emp.id === employeeToDelete.id);
            if (index !== -1) {
              employees.splice(index, 1);
            }
            setEmployeeToDelete(null);
          }}
          onCancel={() => setEmployeeToDelete(null)}
        />
      )}
    </div>
  );
};

export default ListEmployees;
