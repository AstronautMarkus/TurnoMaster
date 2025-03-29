import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from '../Pages/index';

function NormalRouter() {
    return (
        <Routes>
            <Route path="/*" element={<div>Normal</div>} />
        </Routes>
    );
}

export default NormalRouter;
