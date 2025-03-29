import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../Layouts/Auth/AuthLayout';

import Login from '../Pages/Auth/Login/Login';
import RegisterDemo from '../Pages/Auth/RegisterDemo/RegisterDemo';

function AuthRouter() {
    return (
        <AuthLayout>
            <Routes>
                <Route path="/*" element={<div>Auth</div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<div>Register Page</div>} />
                <Route path="/reset-password" element={<div>Reset Password Page</div>} />
                <Route path="/register-demo" element={<RegisterDemo />} />
            </Routes>
        </AuthLayout>
    );
}

export default AuthRouter;
