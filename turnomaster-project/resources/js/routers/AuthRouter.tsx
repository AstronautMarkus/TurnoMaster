import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../Layouts/Auth/AuthLayout';

function AuthRouter() {
    return (
        <AuthLayout>
            <Routes>
                <Route path="/*" element={<div>Auth</div>} />
                <Route path="/login" element={<div>Login Page</div>} />
                <Route path="/register" element={<div>Register Page</div>} />
                <Route path="/reset-password" element={<div>Reset Password Page</div>} />
            </Routes>
        </AuthLayout>
    );
}

export default AuthRouter;
