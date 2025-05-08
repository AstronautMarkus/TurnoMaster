import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../Layouts/Auth/AuthLayout';

import LoginRouter from './LoginRouter';
import RegisterDemo from '../Pages/Auth/RegisterDemo/RegisterDemo';
import ForgotPassword from '../Pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from '../Pages/Auth/ResetPassword/ResetPassword';
import Logout from '../Pages/Auth/Logout/Logout';

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

function AuthRouter() {
    return (
        <AuthLayout>
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
            >
                <Routes>
                    <Route path="/*" element={<div>Auth</div>} />
                    <Route path="/login/*" element={<LoginRouter />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<div>Register Page</div>} />
                    <Route path="/reset-password" element={<div>Reset Password Page</div>} />
                    <Route path="/register-demo" element={<RegisterDemo />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
            </motion.div>
        </AuthLayout>
    );
}

export default AuthRouter;
