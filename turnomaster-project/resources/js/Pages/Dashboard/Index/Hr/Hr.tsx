import { useState, useEffect, JSX } from 'react';
import { FaBullhorn, FaCalendar, FaUsers } from 'react-icons/fa6';
import { FaUserShield, FaUser, FaBuilding } from 'react-icons/fa';
import { FaUserGear } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import useGetCompanyDetails from '../Owner/useGetCompanyDetails';
import AttendanceWidget from '../getShift/getShift';

const Hr = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { data: companyData, loading } = useGetCompanyDetails();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour >= 6 && hour < 12) {
            return "Buenos días";
        } else if (hour >= 12 && hour < 18) {
            return "Buenas tardes";
        } else {
            return "Buenas noches";
        }
    };

    const InfoItem = ({ label, value }: { label: string; value: string }) => (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-semibold">{value || 'N/A'}</p>
        </div>
    );

    const CountItem = ({
        label,
        value,
        icon,
    }: {
        label: string;
        value: number;
        icon?: JSX.Element;
    }) => (
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-xl font-bold flex items-center gap-1">
                {icon}
                {value || 0}
            </p>
        </div>
    );

    const greeting = getGreeting();

    return (
        <div className="p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">TurnoMaster - Recursos Humanos (RR.HH.)</h1>
            
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-grow bg-white shadow-md sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2">{greeting}.</h2>
                        <p className="text-sm sm:text-base">Este es el panel de control de TurnoMaster, donde podrás gestionar tus turnos y citas de manera eficiente.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/dashboard/turnos" className="dashboard-button text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaCalendar />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Turnos</h3>
                                    <p className="text-sm">Gestiona tus turnos aquí</p>
                                </div>
                            </div>
                        </Link>
                        
                        <Link to="/dashboard/employees" className="dashboard-button-secondary text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaUsers />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Empleados</h3>
                                    <p className="text-sm">Gestiona tus empleados aquí</p>
                                </div>
                            </div>
                        </Link>

                        <Link to="/dashboard/reports" className="dashboard-button-success text-white p-4 rounded-none flex flex-col items-center justify-center w-full sm:w-10/12 mx-auto sm:ml-0 sm:mr-auto transition-colors">
                            <div className="flex items-center">
                                <div className="text-4xl mr-4">
                                    <FaBullhorn />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Asistencia y Reportes</h3>
                                    <p className="text-sm">Gestiona tu asistencia y reporta incidencias aquí</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <AttendanceWidget />
            </div>

            <div className="flex flex-col mt-6">
                <div className="bg-white shadow-md sm:p-6">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
                            <FaBuilding/>
                            Empresa asignada
                        </h2>
                        {loading ? (
                            <div className="flex items-center justify-center h-48">
                                <p className="text-lg font-semibold">Cargando...</p>
                            </div>
                        ) : companyData && companyData.company ? (
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="w-48 h-48 bg-gray-200 overflow-hidden">
                                    {(companyData.company.profile_photo && companyData.company.profile_photo !== "null" && companyData.company.profile_photo !== "") ? (
                                        <img src={companyData.company.profile_photo} alt="Empresa" className="object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-lg">
                                            Sin imagen
                                        </div>
                                    )}                                </div>
                                <div className="flex-grow grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                                    <InfoItem label="Nombre de la empresa:" value={companyData.company.name} />
                                    <InfoItem label="Creada por:" value={companyData.company.email ?? ''} />
                                    <InfoItem label="Fecha de registro:" value={companyData.company.created_at} />
                                    <InfoItem label="Ultima modificación:" value={companyData.company.updated_at} />
                                    <CountItem label="Miembros totales:" value={companyData.employees?.total} />
                                    <CountItem label="Administradores:" value={companyData.employees?.details?.admin} icon={<FaUserShield className="dashboard-text inline-block mr-1" />} />
                                    <CountItem label="Recursos Humanos:" value={companyData.employees?.details?.hr} icon={<FaUserGear className="dashboard-text-warning inline-block mr-1" />} />
                                    <CountItem label="Empleados:" value={companyData.employees?.details?.employee} icon={<FaUser className="dashboard-text-success inline-block mr-1" />} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-48">
                                <p className="text-lg font-semibold text-red-500">Error al cargar los datos de la empresa.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hr;