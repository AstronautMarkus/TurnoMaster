import React, { useState } from "react";
import { usePricesFeatures } from "./usePricesFeatures";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const PricingComparison: React.FC = () => {
    const prices = usePricesFeatures();
    const [isYearly, setIsYearly] = useState(false);

    const togglePricing = () => setIsYearly(!isYearly);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="max-w-7xl mx-auto py-10 px-6 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-8 space-y-4">
                    <h1 className="text-4xl font-extrabold text-indigo-700 text-center">
                        🧾 Planes de TurnoMaster
                    </h1>
                    <p className="text-gray-600 text-center max-w-2xl">
                        Compara los planes y elige el que mejor se adapte a las necesidades de tu negocio.
                    </p>
                    <label className="flex items-center cursor-pointer">
                        <span className="text-gray-800 mr-2">Mensual</span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={isYearly}
                                onChange={togglePricing}
                                className="sr-only"
                            />
                            <div
                                className={`block w-10 h-6 rounded-full ${
                                    isYearly ? "bg-[#6c5ce7]" : "bg-gray-200"
                                }`}
                            ></div>
                            <div
                                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                    isYearly ? "transform translate-x-4" : ""
                                }`}
                            ></div>
                        </div>
                        <span className="text-gray-800 ml-2">Anual</span>
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {prices.map((plan, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{plan.title}</h3>
                            <p className="text-gray-600 mb-6" style={{ minHeight: "3rem" }}>{plan.description}</p>
                            <div className="text-3xl font-bold text-gray-900 mb-4">
                                {isYearly ? plan.yearlyPrice : plan.price}
                                <span className="text-lg font-medium">{isYearly ? "/año" : plan.period}</span>
                            </div>
                            <ul className="text-gray-600 space-y-2 mb-6 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        {plan.title === "Freemium" && feature.startsWith("Sin") ? (
                                            <FaXmark className="text-red-500 mr-2" /> 
                                        ) : (
                                            <FaCheck className="text-green-500 mr-2" /> 
                                        )}
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                                <button className="w-full bg-[#6c5ce7] text-white py-2 px-4 rounded hover:bg-[#5b4acb]">
                                    {plan.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">¿No sabes qué plan escoger?</h3>
                    <p className="text-gray-600 mb-6">
                        Nuestro equipo está aquí para ayudarte a encontrar el plan perfecto para ti.
                    </p>
                    <div className="flex justify-center">
                        <Link to='/contact' className='bg-[#6c5ce7] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#5b4acb] transition duration-300 transform hover:scale-105'>
                            Contactar Soporte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingComparison;