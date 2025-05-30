import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../../Layouts/Dashboard/Components/ProtectedRoute/ProtectedRoute';
import ListTurnos from '../../../Pages/Dashboard/Turnos/List/ListTurnos';
import EditTurno from '../../../Pages/Dashboard/Turnos/Edit/EditTurno';
import CreateTurno from '../../../Pages/Dashboard/Turnos/Create/CreateTurno';
import UsersListTurno from '../../../Pages/Dashboard/Turnos/Users/UsersListTurno';


function DashboardTurnosRouter() {
    return (
        <ProtectedRoute allowedRoles={[1,2]}>
            <Routes>
            <Route path="/" element={<ListTurnos />} />
            <Route path="/create" element={<CreateTurno />} />
            <Route path="/edit/:id" element={<EditTurno />} />
            <Route path="/:shiftId/users" element={<UsersListTurno />} />
            </Routes>
        </ProtectedRoute>
    );
}

export default DashboardTurnosRouter;