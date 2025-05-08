import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DefalutLogin from '../Pages/Auth/Login/Default/DefaultLogin'; 
import EmployeesLogin from '../Pages/Auth/Login/Employees/EmployeesLogin';
import CompaniesLogin from '../Pages/Auth/Login/Companies/CompaniesLogin';

function LoginRouter() {
    return (
        <Routes>
            <Route path="/" element={<DefalutLogin />} />
            <Route path="/employees" element={<EmployeesLogin />} />
            <Route path="/companies" element={<CompaniesLogin />} />
        </Routes>
    );
}

export default LoginRouter;
