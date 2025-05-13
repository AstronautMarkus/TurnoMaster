import React from 'react';
import { NavLink } from 'react-router-dom';

import StatsGetter from '../../../Components/Default/StatsGetter/StatsGetter';

const IndexPage: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">

                <section className="relative w-full py-24 bg-gray-900">
                    <div className="absolute inset-0">
                        <img
                            src="/img/persons/nastuh-abootalebi-yWwob8kwOCk-unsplash.jpg"
                            alt="Person working illustration"
                            className="object-cover object-center w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                    </div>
                    <div className="relative container mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                        
                        <div className="space-y-6 text-white">

                            <h2 className="text-2xl font-semibold">
                                ¿Estás listo para optimizar la gestión de tu empresa?
                            </h2>
                            <h1 className="lg:text-6xl font-extrabold tracking-tight">
                                Lleva la gestión de tu empresa al siguiente nivel con TurnoMaster
                            </h1>
                            <p className="text-lg max-w-xl">
                                Ahorra horas de trabajo con nuestro sistema que registra entradas, colaciones y salidas de forma rápida y centralizada.
                                Administra tus equipos como nunca antes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <NavLink to="/prices" className="inline-flex h-12 items-center justify-center rounded-full bg-[#e01d1d] hover:bg-[#b21e1e] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                    Adquirir TurnoMaster
                                </NavLink>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-full border border-white px-6 font-medium text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                    Ver demostración
                                </a>
                            </div>
                        </div>

                    </div>
                </section>

                <section className="w-full py-12 bg-white">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            ¿Qué es TurnoMaster?
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            TurnoMaster es una plataforma web que permite a empresas gestionar los horarios de sus trabajadores de manera simple, eficiente y moderna. Desde el registro de entrada/colación/salida hasta reportes detallados y notificaciones automáticas, todo en un solo lugar.
                        </p>
                    </div>
                    <div className="container mx-auto px-4 md:px-6 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            <div className="space-y-4">
                                <div className="text-4xl">✅</div>
                                <h3 className="text-xl font-semibold text-gray-900">Registro de turnos</h3>
                                <p className="text-gray-600 text-sm">
                                    Lleva un control preciso de las entradas, salidas y colaciones de tu equipo.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-4xl">📊</div>
                                <h3 className="text-xl font-semibold text-gray-900">Reportes detallados</h3>
                                <p className="text-gray-600 text-sm">
                                    Obtén reportes completos para analizar el rendimiento y la asistencia.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-4xl">📬</div>
                                <h3 className="text-xl font-semibold text-gray-900">Notificaciones inteligentes</h3>
                                <p className="text-gray-600 text-sm">
                                    Recibe alertas automáticas para mantenerte informado en todo momento.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-4xl">🧠</div>
                                <h3 className="text-xl font-semibold text-gray-900">Control total de tu personal</h3>
                                <p className="text-gray-600 text-sm">
                                    Administra a tu equipo de manera eficiente y sin complicaciones.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src="/img/persons/krakenimages-376KN_ISplE-unsplash.jpg"
                                    alt="Simple tool illustration"
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                                    Menos complicaciones
                                </h2>
                                <p className="text-lg text-gray-500 md:text-xl mt-4 max-w-[600px]">
                                    En el ámbito empresarial, <strong>"poco es mucho"</strong>.<br />
                                    TurnoMaster elimina la complejidad innecesaria y te ofrece una herramienta simple, pero eficiente.<br />
                                    Gestiona los horarios de tus empleados sin dolores de cabeza.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <StatsGetter />


                <section className="w-full py-12">
                    <h2 className="text-4xl font-semibold text-center mb-4">Una mirada al interior de TurnoMaster</h2>
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="relative w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Vista previa del sistema TurnoMaster 1"
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                            <div className="relative w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Vista previa del sistema TurnoMaster 2"
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                            <div className="relative w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Vista previa del sistema TurnoMaster 3"
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 bg-gray-100">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Próximamente en TurnoMaster:
                        </h2>
                        <ul className="space-y-4 text-lg text-gray-700">
                            <li className="flex items-center justify-center gap-2">
                                <span role="img" aria-label="App móvil">📱</span> App móvil
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span role="img" aria-label="Integración con WhatsApp">💬</span> Integración con WhatsApp
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span role="img" aria-label="Expansión de planes personalizados">🎯</span> Expansión de planes personalizados
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="w-full py-12">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            ¿Listo para empezar?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 mb-6">
                            Únete a la revolución de la gestión de turnos con TurnoMaster.
                        </p>
                        <NavLink
                            to="/prices"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-[#28a745] hover:bg-[#218838] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Adquirir TurnoMaster
                        </NavLink>
                    </div>
                </section>



        </div>
    );
};

export default IndexPage;