import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../../Layouts/Dashboard/DashboardLayout';
import { useDashboardGuard } from '../../hooks/auth/useDashboardGuard';

import Index from '../../Pages/Dashboard/Index/Index';
import DashboardSettingsRouter from './Settings/DashboardSettingsRouter';

import DashboardEmployeesRouter from './Employees/DashboardEmployeesRouter';
import DashboardTurnosRouter from './Turnos/DashboardTurnosRouter';
import ReportsRouter from './Reports/ReportsRouter';

import ActivityLogs from '../../Pages/Dashboard/Logs/ActivityLogs';

import ProtectedRoute from '../../Layouts/Dashboard/Components/ProtectedRoute/ProtectedRoute';

function DashboardRouter() {
    const location = useLocation();

    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
    };

    return (
        <DashboardLayout>
            {useDashboardGuard(
                <AnimatePresence mode="wait">
                    <motion.div key={location.pathname} {...pageTransition} className="w-full">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/*" element={<Index />} />
                            <Route path="/settings/*" element={<DashboardSettingsRouter />} />
                            <Route path="/employees/*" element={<DashboardEmployeesRouter />} />
                            <Route path="/turnos/*" element={<DashboardTurnosRouter />} />
                            <Route path="/reports/*" element={<ReportsRouter />} />
                            <Route path="/logs/activity" element={
                                <ProtectedRoute allowedRoles={[1]}>
                                    <ActivityLogs />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            )}
        </DashboardLayout>
    );
}

export default DashboardRouter;
