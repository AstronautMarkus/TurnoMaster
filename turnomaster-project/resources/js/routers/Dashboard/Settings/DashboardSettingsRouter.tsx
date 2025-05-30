import { Routes, Route } from 'react-router-dom';

import Appearance from '../../../Pages/Dashboard/Settings/Appearance/Appearance';
import Settings from '../../../Pages/Dashboard/Settings/Settings';
import Profile from '../../../Pages/Dashboard/Profile/Profile';
import CompanySettings from '../../../Pages/Dashboard/Settings/Company/CompanySettings';

function DashboardSettingsRouter() {
    return (
        <Routes>
            <Route path="/*" element={<Settings />} />
            <Route path="/appearance" element={<Appearance />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/company" element={<CompanySettings />} />
        </Routes>
    );
}

export default DashboardSettingsRouter;