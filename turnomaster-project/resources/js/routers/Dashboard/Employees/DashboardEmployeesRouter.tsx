import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../../../Layouts/Dashboard/Components/ProtectedRoute/ProtectedRoute';
import ListEmployees from '../../../Pages/Dashboard/Employees/List/ListEmployees';
import CreateEmployee from '../../../Pages/Dashboard/Employees/Create/CreateEmployee';
import EditEmployee from '../../../Pages/Dashboard/Employees/Edit/EditEmployee';
import EmployeesAssignTurno from '../../../Pages/Dashboard/Employees/Turnos/Assign/EmployeesAssignTurno';
import EmployeesTurnosList from '../../../Pages/Dashboard/Employees/Turnos/List/EmployeesTurnosList';

function DashboardEmployeesRouter() {
    const location = useLocation();

    return (
        <>
            <ProtectedRoute allowedRoles={[1, 2]}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/*" element={<ListEmployees />} />
                    <Route path="/create" element={<CreateEmployee />} />
                    <Route path="/edit/:id" element={<EditEmployee />} />
                    <Route path="/:id/shifts" element={<EmployeesTurnosList />} />
                    <Route path="/:id/assign-shifts" element={<EmployeesAssignTurno />} />
                    <Route path="/:id/shift/:shift/edit" element={<div>Editar el turno creado para el empleado</div>} />
                </Routes>
            </ProtectedRoute>
        </>
    );
}

export default DashboardEmployeesRouter;
