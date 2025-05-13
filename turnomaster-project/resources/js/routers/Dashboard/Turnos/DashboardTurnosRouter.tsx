import React from 'react';
import { Routes, Route } from 'react-router-dom';


function DashboardTurnosRouter() {
    return (
        <Routes>
            <Route path="/*" element={<div>Default Turnos</div>} />
        </Routes>
    );
}

export default DashboardTurnosRouter;