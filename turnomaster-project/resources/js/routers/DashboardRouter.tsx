import React, { JSX } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from '../Layouts/Dashboard/DashboardLayout';

import Index from '../Pages/Dashboard/Index/Index';
import Profile from '../Pages/Dashboard/Profile/Profile';
import Settings from '../Pages/Dashboard/Settings/Settings';

function parseJwt(token: string): { exp?: number } | null {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
}

function DashboardGuard({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return <Navigate to="/auth/login" />;
    }

    return children;
}

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
            <DashboardGuard>
                <AnimatePresence mode="wait">
                    <motion.div key={location.pathname} {...pageTransition} className="w-full">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/*" element={<Index />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            </DashboardGuard>
        </DashboardLayout>
    );
}

export default DashboardRouter;
