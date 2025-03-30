import React from 'react';
import { NavLink } from 'react-router-dom';

import StatsGetter from '../../../Components/Default/StatsGetter/StatsGetter';

const IndexPage: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">

                <section className="w-full py-24">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                        
                        <div className="space-y-6">
                        <p className="uppercase text-sm font-semibold text-[#6c5ce7] tracking-wide">
                            El sistema más moderno de gestión de turnos
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
                            Lleva la gestión de tu empresa al siguiente nivel con TurnoMaster
                        </h1>
                        <p className="text-lg text-gray-600 max-w-xl">
                            Ahorra horas de trabajo con nuestro sistema que registra entradas, colaciones y salidas de forma rápida y centralizada.
                            Administra tus equipos como nunca antes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <NavLink
                            to="/prices"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-[#28a745] hover:bg-[#218838] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                            Adquirir TurnoMaster
                            </NavLink>
                            <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-[#6c5ce7] hover:bg-[#5b4acb] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                            Ver demostración
                            </a>
                        </div>
                        </div>

                        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
                            <img
                                src="/img/persons/anne-nygard-jORjvhaUX40-unsplash.jpg"
                                alt="Person working illustration"
                                className="object-cover object-center w-full h-full"
                            />
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
        </div>
    );
};

export default IndexPage;