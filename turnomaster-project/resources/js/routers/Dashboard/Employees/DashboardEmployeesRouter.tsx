import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useDashboardGuard } from '../../../hooks/auth/useDashboardGuard';

import ListEmployees from '../../../Pages/Dashboard/Employees/List/ListEmployees';
import CreateEmployee from '../../../Pages/Dashboard/Employees/Create/CreateEmployee';
import EditEmployee from '../../../Pages/Dashboard/Employees/Edit/EditEmployee';
import EmployeesAssignTurno from '../../../Pages/Dashboard/Employees/Turnos/Assign/EmployeesAssignTurno';
import EmployeesTurnosList from '../../../Pages/Dashboard/Employees/Turnos/List/EmployeesTurnosList';

function DashboardEmployeesRouter() {
    const location = useLocation();

    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
    };

    return (
        <>
            {useDashboardGuard(
                <AnimatePresence mode="wait">
                    <motion.div key={location.pathname} {...pageTransition} className="w-full">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/*" element={<ListEmployees />} />
                            <Route path="/create" element={<CreateEmployee />} />
                            <Route path="/edit/:id" element={<EditEmployee />} />
                            <Route path="/:id/shifts" element={<EmployeesTurnosList />} />
                            <Route path="/:id/assign-shifts" element={<EmployeesAssignTurno />} />
                            <Route path="/:id/shift/:shift/edit" element={<div>Editar el turno creado para el empleado</div>} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}

export default DashboardEmployeesRouter;
