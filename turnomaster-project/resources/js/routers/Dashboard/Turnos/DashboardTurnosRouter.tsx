import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ListTurnos from '../../../Pages/Dashboard/Turnos/List/ListTurnos';
import EditTurno from '../../../Pages/Dashboard/Turnos/Edit/EditTurno';
import CreateTurno from '../../../Pages/Dashboard/Turnos/Create/CreateTurno';

function DashboardTurnosRouter() {
    return (
        <Routes>
            <Route path="/" element={<ListTurnos />} />
            <Route path="/create" element={<CreateTurno />} />
            <Route path="/edit/:id" element={<EditTurno />} />
        </Routes>
    );
}

export default DashboardTurnosRouter;