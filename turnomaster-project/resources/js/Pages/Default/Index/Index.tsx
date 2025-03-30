import React from 'react';
import { NavLink } from 'react-router-dom';

import StatsGetter from '../../../Components/Default/StatsGetter/StatsGetter';

const IndexPage: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
                    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                            ¿Estás listo para optimizar la gestión de horarios de tus empleados?
                            </h1>
                            <p className="text-lg text-gray-500 md:text-xl max-w-[600px]">
                            <strong>TurnoMaster</strong> es el software ideal para gestionar las entradas y salidas de tu negocio, 
                            permitiéndote conectar mejor con tus empleados y optimizar la administración de tu empresa.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <NavLink
                                to="/prices"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-[#ff7f50] hover:bg-[#ff6b3d] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Adquirir TurnoMaster
                            </NavLink>
                            <a
                                href="https://www.youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-[#3498db] hover:bg-[#2980b9] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Demostración
                            </a>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
                            <img
                                src="/img/persons/anne-nygard-jORjvhaUX40-unsplash.jpg"
                                alt="Hero image"
                                className="object-cover object-center w-full h-full"
                            />
                            </div>
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
        </div>
    );
};

export default IndexPage;