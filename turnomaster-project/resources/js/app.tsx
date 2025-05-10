import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../css/app.css';

import NormalRouter from './routers/Default/NormalRouter';
import AuthRouter from './routers/AuthRouter';
import DashboardRouter from './routers/DashboardRouter';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<NormalRouter />} />
                <Route path="/auth/*" element={<AuthRouter />} />
                <Route path="/dashboard/*" element={<DashboardRouter />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
