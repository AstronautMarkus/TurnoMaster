import { Routes, Route } from 'react-router-dom';

import ReportsIndex from '../../../Pages/Dashboard/Reports/Index/ReportsIndex';


function ReportsRouter() {
    return (
        <Routes>
            <Route path="/*" element={<ReportsIndex/>} />
            <Route path="/turnos/register" element={<h1>Registro de Turnos</h1>}/>
            <Route path="/turnos/review" element={<h1>Revisión de Turnos</h1>}/>
            <Route path="/new" element={<h1>Nuevo Reporte</h1>}/>
            <Route path="/list" element={<h1>Lista de Reportes</h1>}/>
        </Routes>
    );
}

export default ReportsRouter;