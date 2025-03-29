import React from 'react';
import { Routes, Route } from 'react-router-dom';

function AuthRouter() {
    return (
        <Routes>
            <Route path="/*" element={<div>Auth</div>} />
        </Routes>
    );
}

export default AuthRouter;
