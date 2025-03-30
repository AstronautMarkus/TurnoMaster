import React from 'react';

const Features: React.FC = () => {
    return (
        <div className="min-h-screen">
            <header className="py-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Características del Proyecto</h1>
                    <p className="mt-2 text-lg">Descubre las increíbles funcionalidades que ofrecemos</p>
                </div>
            </header>

            <main className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-bolt"></i>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Rendimiento Rápido</h2>
                        <p className="text-gray-600">Nuestra plataforma está optimizada para ofrecer un rendimiento excepcional.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-lock"></i>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Seguridad</h2>
                        <p className="text-gray-600">Tus datos están protegidos con las mejores prácticas de seguridad.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-cogs"></i>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Personalización</h2>
                        <p className="text-gray-600">Configura la plataforma según tus necesidades específicas.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-users"></i>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Colaboración</h2>
                        <p className="text-gray-600">Trabaja en equipo de manera eficiente y sin complicaciones.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Análisis Avanzado</h2>
                        <p className="text-gray-600">Obtén información detallada para tomar decisiones informadas.</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="text-blue-600 text-4xl mb-4">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Compatibilidad Móvil</h2>
                        <p className="text-gray-600">Accede a la plataforma desde cualquier dispositivo móvil.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Features;