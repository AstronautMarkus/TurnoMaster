import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import IndexPage from '../Pages/Default/Index/Index';
import DefaultLayout from '../Layouts/Default/DefaultLayout';
import PricingComparison from '../Pages/Default/Prices/Prices';
import AboutProject from '../Pages/Default/AboutProject/AboutProject';
import Features from '../Pages/Default/Features/Features';

function NormalRouter() {
    const location = useLocation();

    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
    };

    return (
        <DefaultLayout>
            <AnimatePresence mode="wait">
                <motion.div key={location.pathname} {...pageTransition} className="w-full">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/*" element={<IndexPage />} />
                        <Route path="/prices" element={<PricingComparison />} />
                        <Route path="/clients" element={<h1>Clients Page</h1>} />
                        <Route path="/about-project" element={<AboutProject />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/turnomaster-audience" element={<h1>TurnoMaster Audience Page</h1>} />
                        <Route path="/integrations" element={<h1>Integrations Page</h1>} />
                        <Route path="/faq" element={<h1>FAQ Page</h1>} />
                        <Route path="/security-privacy" element={<h1>Security & Privacy Page</h1>} />
                    </Routes>
                </motion.div>
            </AnimatePresence>
        </DefaultLayout>
    );
}

export default NormalRouter;
