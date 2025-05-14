import { Link } from 'react-router-dom';
import { FaShieldAlt, FaLock, FaUserSecret,FaBug, FaCodeBranch} from 'react-icons/fa';

const SecurityPrivacy = () => {
    return (
        <section className="min-h-screen py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-indigo-700 mb-4">Seguridad y Privacidad</h1>
                    <p className="text-lg text-gray-600">
                        En <strong>TurnoMaster</strong>, la seguridad de tus datos es prioridad. Implementamos múltiples capas de protección para garantizar que tu información esté siempre segura.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <FaCodeBranch className="text-indigo-600 text-4xl mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Backend Laravel Seguro</h2>
                        <p className="text-gray-600 text-sm">
                            Utilizamos Laravel, un framework robusto con sistemas integrados de autenticación, validación de datos, y control de acceso a nivel de middleware.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <FaLock className="text-blue-600 text-4xl mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Cifrado de Información</h2>
                        <p className="text-gray-600 text-sm">
                            Todos los datos sensibles son cifrados utilizando algoritmos modernos (bcrypt y AES-256), tanto en tránsito como en almacenamiento.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <FaShieldAlt className="text-green-600 text-4xl mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Protección Antibots</h2>
                        <p className="text-gray-600 text-sm">
                            Implementamos servicios de validación como <strong>Cloudflare Turnstile</strong> para evitar accesos automatizados, proteger nuestros formularios y a la vez, facilitarle el funcionamiento al usuario.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <FaBug className="text-red-500 text-4xl mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Protección contra vulnerabilidades</h2>
                        <p className="text-gray-600 text-sm">
                            Prevención activa ante ataques comunes: XSS, CSRF, SQL Injection, y ejecución remota. Monitoreamos constantemente posibles vectores de ataque.
                        </p>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center lg:col-span-2 lg:mx-auto">
                        <FaUserSecret className="text-purple-600 text-4xl mb-4 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Privacidad Garantizada</h2>
                        <p className="text-gray-600 text-sm">
                            Tus datos nunca serán compartidos con terceros sin tu consentimiento. Seguimos lineamientos éticos y legales para el tratamiento de la información.
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Entonces, todo listo?</h2>
                    <p className="text-gray-600 text-lg mb-6">
                        Te invitamos a explorar nuestra oferta de servicios y descubrir cómo <strong>TurnoMaster</strong> puede ayudarte a optimizar la gestión de turnos en tu negocio.
                    </p>
                    <Link to="/prices" className="inline-flex h-12 items-center justify-center rounded-full bg-[#28a745] hover:bg-[#218838] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Adquirir TurnoMaster</Link>
                </div>

            </div>
        </section>
    );
};

export default SecurityPrivacy;
