import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../Layouts/Dashboard/DashboardLayout';

function DashboardRouter() {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/*" element={<div>Dashboard</div>} />
                <Route path="/dashboard" element={<div>Dashboard Page</div>} />
                <Route path="/settings" element={<div>Settings Page</div>} />
                <Route path="/profile" element={<div>Profile Page</div>} />
                <Route path="/users" element={<div>Users Page</div>} />
                <Route path="/reports" element={<div>Reports Page</div>} />
            </Routes>
        </DashboardLayout>
    );
}

export default DashboardRouter;
