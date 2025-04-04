import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../Layouts/Auth/AuthLayout';

import Login from '../Pages/Auth/Login/Login';
import RegisterDemo from '../Pages/Auth/RegisterDemo/RegisterDemo';

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<div>Register Page</div>} />
                    <Route path="/reset-password" element={<div>Reset Password Page</div>} />
                    <Route path="/register-demo" element={<RegisterDemo />} />
                </Routes>
            </motion.div>
        </AuthLayout>
    );
}

export default AuthRouter;
