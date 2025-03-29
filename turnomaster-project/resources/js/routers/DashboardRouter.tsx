import React from 'react';
import { Routes, Route } from 'react-router-dom';

function DashboardRouter() {
    return (
        <Routes>
            <Route path="/*" element={<div>Dashboard</div>} />
        </Routes>
    );
}

export default DashboardRouter;
