import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from '../Pages/Default/Index/Index';
import DefaultLayout from '../Layouts/Default/DefaultLayout';
import PricingComparison from '../Pages/Default/Prices/Prices';

function NormalRouter() {
    return (
        <DefaultLayout>
            <Routes>
                <Route path="/*" element={<IndexPage />} />
                <Route path="/prices" element={<PricingComparison />} />
                <Route path="/clients" element={<h1>Clients Page</h1>} />
                <Route path="/about-project" element={<h1>About Project Page</h1>} />
                <Route path="/features" element={<h1>Features Page</h1>} />
                <Route path="/turnomaster-audience" element={<h1>TurnoMaster Audience Page</h1>} />
                <Route path="/integrations" element={<h1>Integrations Page</h1>} />
                <Route path="/faq" element={<h1>FAQ Page</h1>} />
                <Route path="/security-privacy" element={<h1>Security & Privacy Page</h1>} />
            </Routes>
        </DefaultLayout>
    );
}

export default NormalRouter;
