import React, { useState } from "react";
import { usePricesFeatures } from "./usePricesFeatures";
import { FaCheck } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";

const PricingComparison: React.FC = () => {
    const prices = usePricesFeatures();
    const [isYearly, setIsYearly] = useState(false);

    const togglePricing = () => setIsYearly(!isYearly);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-8 space-y-4">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                        Comparativa de Precios y Planes
                    </h2>
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
                    <p className="text-gray-600 text-center max-w-2xl">
                        <strong>TurnoMaster</strong> ofrece una variedad de planes para adaptarse a tus necesidades.
                        Ya sea que seas un individuo, un pequeño equipo o una gran organización, tenemos el plan perfecto para ti.
                        <br /><br /> Compara las características y precios de cada plan para encontrar el que mejor se adapte a tus necesidades.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prices.map((plan, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{plan.title}</h3>
                            <p className="text-gray-600 mb-6">{plan.description}</p>
                            <div className="text-4xl font-bold text-gray-900 mb-4">
                                {isYearly ? plan.yearlyPrice : plan.price}
                                <span className="text-lg font-medium">{isYearly ? "/año" : plan.period}</span>
                            </div>
                            <ul className="text-gray-600 space-y-2 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <FaCheck className="text-green-500 mr-2" /> {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-[#6c5ce7] text-white py-2 px-4 rounded hover:bg-[#5b4acb]">
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">¿No sabes qué plan escoger?</h3>
                    <p className="text-gray-600 mb-6">
                        Nuestro equipo está aquí para ayudarte a encontrar el plan perfecto para ti.
                    </p>
                    <div className="flex justify-center">
                        <button className="bg-[#6c5ce7] text-white py-2 px-6 rounded hover:bg-[#5b4acb] flex items-center justify-center space-x-2">
                            <FiMessageCircle />
                            <span>Contáctanos</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PricingComparison;