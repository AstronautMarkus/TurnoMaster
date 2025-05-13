import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../../Layouts/Dashboard/DashboardLayout';
import { useDashboardGuard } from '../../hooks/auth/useDashboardGuard';

import Index from '../../Pages/Dashboard/Index/Index';
import Profile from '../../Pages/Dashboard/Profile/Profile';
import Settings from '../../Pages/Dashboard/Settings/Settings';

import DashboardEmployeesRouter from './Employees/DashboardEmployeesRouter';
import DashboardTurnosRouter from './Turnos/DashboardTurnosRouter';

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
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/employees/*" element={<DashboardEmployeesRouter />} />
                            <Route path="/turnos/*" element={<DashboardTurnosRouter />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            )}
        </DashboardLayout>
    );
}

export default DashboardRouter;
