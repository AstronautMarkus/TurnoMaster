import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../../Layouts/Auth/AuthLayout';

import LoginRouter from './Login/LoginRouter';
import RegisterDemo from '../../Pages/Auth/RegisterDemo/RegisterDemo';

import CompaniesForgotPassword from '../../Pages/Auth/ForgotPassword/Companies/CompaniesForgotPassword';
import EmployeesForgotPassword from '../../Pages/Auth/ForgotPassword/Employees/EmployeesForgotPassword';

import CompaniesResetPassword from '../../Pages/Auth/ResetPassword/Companies/CompaniesResetPassword';
import EmployeesResetPassword from '../../Pages/Auth/ResetPassword/Employees/EmployeesResetPassword';

import Logout from '../../Pages/Auth/Logout/Logout';

function AuthRouter() {
    return (
        <AuthLayout>
            <Routes>
                <Route path="/*" element={<div>Auth</div>} />
                <Route path="/login/*" element={<LoginRouter />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<div>Register Page</div>} />
                <Route path="/reset-password" element={<div>Reset Password Page</div>} />
                <Route path="/register-demo" element={<RegisterDemo />} />
                <Route path="/forgot-password/companies" element={<CompaniesForgotPassword />} />
                <Route path="/forgot-password/employees" element={<EmployeesForgotPassword />} />
                <Route path="/reset-password/companies/:token" element={<CompaniesResetPassword />} />
                <Route path="/reset-password/employees/:token" element={<EmployeesResetPassword />} />
            </Routes>
        </AuthLayout>
    );
}

export default AuthRouter;
