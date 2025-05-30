import { Routes, Route } from 'react-router-dom';

import ReportsIndex from '../../../Pages/Dashboard/Reports/Index/ReportsIndex';


function ReportsRouter() {
    return (
        <Routes>
            <Route path="/*" element={<ReportsIndex/>} />
        </Routes>
    );
}

export default ReportsRouter;