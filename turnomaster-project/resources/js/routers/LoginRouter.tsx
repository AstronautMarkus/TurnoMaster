import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DefalutLogin from '../Pages/Auth/Login/Default/DefaultLogin'; 

function LoginRouter() {
    return (
        <Routes>
            <Route path="/" element={<DefalutLogin/>} />
            <Route path="/employees" element={<div>Login Employees Page</div>} />
            <Route path="/companies" element={<div>Login Companies Page</div>} />
        </Routes>
    );
}

export default LoginRouter;
