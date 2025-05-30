import { Link } from "react-router-dom";

function CompanySettings() {
    return (
        <div>
            <h1>Configurar Empresa</h1>
            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/settings" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>
        </div>
    );
}

export default CompanySettings;