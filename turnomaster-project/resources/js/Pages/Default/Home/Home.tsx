import { NavLink } from 'react-router-dom';
import HelmetHelper from '../../../hooks/HelmetHelper/HelmetHelper';
import { FaSearch, FaMoneyBillWave, FaBook } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";

import { MdAssessment, MdAssignmentAdd, MdAvTimer } from "react-icons/md";


const HomePage = () => {
    return (
    <>
        <HelmetHelper path="/" />

        <div className="flex flex-col w-full h-full">

                <section className="relative w-full py-24">
                    <div className="absolute inset-0">
                        <img
                            src="/img/persons/nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg"
                            alt="Background TurnoMaster"
                            className="object-cover object-center w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                    <div className="relative container mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                        
                        <div className="space-y-6 text-white">

                            <h2 className="text-2xl font-semibold">
                                Facilita la gestión de turnos en tu empresa
                            </h2>
                            <h1 className="lg:text-6xl font-extrabold tracking-tight">
                                TurnoMaster simplifica tus horarios
                            </h1>
                            <p className="text-lg max-w-xl">
                                Registra y administra turnos de forma rápida y centralizada.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <NavLink
                                    to="/about-project"
                                    className="inline-flex h-16 text-xl items-center justify-center bg-[#e01d1d] hover:bg-[#b21e1e] px-10 font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 gap-3"
                                >
                                    <FaSearch className="w-6 h-6" />
                                    Descubrir TurnoMaster
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="relative w-full py-16 bg-[#891818]">
                    <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 text-white space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Un plan que se adapta a lo que buscas
                        </h2>
                        <p className="text-lg">
                            Elige la opción que mejor se ajuste a tu empresa y empieza a optimizar tu gestión de turnos hoy mismo.
                        </p>
                        </div>
                        <div>
                        <NavLink
                            to="/prices"
                            className="flex items-center text-white text-lg px-4 py-2 border border-white transition-colors hover:bg-white hover:text-black h-14 gap-2"
                        >
                            <FaMoneyBillWave className="w-6 h-6" />
                            Ver planes y precios
                        </NavLink>
                        </div>
                    </div>

                </section>


                <section className="w-full py-12">
                        <div className="mt-12 container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

                            <div className="flex flex-col justify-center items-start space-y-4">
                                <div className="flex items-center mb-2">
                                    <div className="w-2 h-10 bg-[#e01d1d] mr-4"></div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        ¿Por qué elegir TurnoMaster?
                                    </h2>
                                </div>
                                <p className="text-lg text-gray-700">
                                    Gestiona turnos, empleados y cuentas de manera eficiente. Nuestra plataforma te ayuda a ahorrar tiempo y mejorar la organización de tu empresa.
                                </p>
                                <ul className="list-disc pl-5 text-gray-700">
                                    <li>Fácil de usar y configurar</li>
                                    <li>Acceso para múltiples empleados</li>
                                    <li>Control total de horarios y turnos</li>
                                </ul>
                            </div>

                            <div className="flex flex-col items-center border-2 border-gray-300">
                                <img
                                    src="/img/persons/workplace-5517762_1280.jpg"
                                    alt="Personas"
                                    className="object-cover object-center w-full h-full shadow-lg"
                                />
                            </div>

                        </div>
                </section>

                <section className="w-full py-16">

                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-center mb-10">
                            <div className="w-2 h-10 bg-[#e01d1d] mr-4"></div>
                            <h2 className="text-3xl md:text-3xl font-bold text-center text-black">
                                Nos encargamos de la gestión. Accede a la información que necesitas, cuando la necesites.
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
                            <div className="flex flex-col items-center shadow-md p-10 w-full h-full border-2 border-gray-300">
                                <MdAssignmentAdd className="w-20 h-20 text-[#e01d1d] mb-6" />
                                <h3 className="text-2xl font-semibold text-black mb-4">Gestión avanzada de usuarios</h3>
                                <p className="text-lg text-gray-700 text-center">Crea y administra cuentas para cada miembro de tu equipo, garantizando control y seguridad en todo momento.</p>
                            </div>
                            <div className="flex flex-col items-center shadow-md p-10 w-full h-full border-2 border-gray-300">
                                <MdAvTimer className="w-20 h-20 text-[#e01d1d] mb-6" />
                                <h3 className="text-2xl font-semibold text-black mb-4">Registro de actividad en tiempo real</h3>
                                <p className="text-lg text-gray-700 text-center">Supervisa la asistencia y desempeño de tus empleados con información precisa y actualizada.</p>
                            </div>
                            <div className="flex flex-col items-center shadow-md p-10 w-full h-full border-2 border-gray-300">
                                <MdAssessment className="w-20 h-20 text-[#e01d1d] mb-6" />
                                <h3 className="text-2xl font-semibold text-black mb-4">Estadísticas precisas y detalladas</h3>
                                <p className="text-lg text-gray-700 text-center">Accede a reportes visuales y completos para tomar decisiones informadas y potenciar tu empresa.</p>
                            </div>
                            <div className="flex flex-col items-center shadow-md p-10 w-full h-full border-2 border-gray-300">
                                <FaHandshakeSimple className="w-20 h-20 text-[#e01d1d] mb-6" />
                                <h3 className="text-2xl font-semibold text-black mb-4">Sin trámites innecesarios</h3>
                                <p className="text-lg text-gray-700 text-center">Olvídate de procesos complejos. Gestiona todo de manera ágil, sencilla y eficiente.</p>
                            </div>
                        </div>
                    </div>
                            
                            
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center mt-8">
                        <NavLink
                            to="/features"
                            className="inline-flex h-16 text-xl items-center justify-center bg-[#e01d1d] hover:bg-[#b21e1e] px-10 font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 gap-3"
                        >
                            <FaBook className="w-6 h-6" />
                            Conozca todos los detalles
                        </NavLink>
                    </div>

                </section>

        </div>
    </>
    );
};

export default HomePage;