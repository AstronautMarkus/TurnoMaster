import React, { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../Layouts/Dashboard/DashboardLayout';

import Index from '../Pages/Dashboard/Index/Index';

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
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/*" element={<DashboardGuard><Index /></DashboardGuard>} />
                <Route path="/dashboard" element={<DashboardGuard><div>Dashboard Page</div></DashboardGuard>} />
                <Route path="/settings" element={<DashboardGuard><div>Settings Page</div></DashboardGuard>} />
                <Route path="/profile" element={<DashboardGuard><div>Profile Page</div></DashboardGuard>} />
                <Route path="/users" element={<DashboardGuard><div>Users Page</div></DashboardGuard>} />
                <Route path="/reports" element={<DashboardGuard><div>Reports Page</div></DashboardGuard>} />
            </Routes>
        </DashboardLayout>
    );
}

export default DashboardRouter;
