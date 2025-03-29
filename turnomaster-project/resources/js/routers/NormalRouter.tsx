import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from '../Pages/index';
import DefaultLayout from '../Layouts/Default/DefaultLayout';

function NormalRouter() {
    return (
        <Routes>
            <Route path="/*" element={ <DefaultLayout> <IndexPage /> </DefaultLayout>}/>
        </Routes>
    );
}

export default NormalRouter;
