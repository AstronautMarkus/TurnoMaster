import { Routes, Route } from 'react-router-dom';
import Appearance from '../../../Pages/Dashboard/Settings/Appearance/Appearance';
import Settings from '../../../Pages/Dashboard/Settings/Settings';
import Profile from '../../../Pages/Dashboard/Profile/Profile';
import CompanySettings from '../../../Pages/Dashboard/Settings/Company/CompanySettings';
import ProtectedRoute from '../../../Layouts/Dashboard/Components/ProtectedRoute/ProtectedRoute';

function DashboardSettingsRouter() {
    return (
        <Routes>
            <Route path="/*" element={<Settings />} />
            <Route
                path="/appearance"
                element={
                    <ProtectedRoute allowedRoles={[1, 2, 3]}>
                        <Appearance />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute allowedRoles={[1, 2, 3]}>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/company"
                element={
                    <ProtectedRoute allowedRoles={[1]}>
                        <CompanySettings />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default DashboardSettingsRouter;