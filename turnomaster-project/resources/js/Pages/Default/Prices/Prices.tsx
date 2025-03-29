import React from "react";
import { usePricesFeatures } from "./usePricesFeatures";
import { FaCheck } from "react-icons/fa6";

const PricingComparison: React.FC = () => {
    const prices = usePricesFeatures();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Comparativa de Precios y Planes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prices.map((plan, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{plan.title}</h3>
                            <p className="text-gray-600 mb-6">{plan.description}</p>
                            <div className="text-4xl font-bold text-gray-900 mb-4">
                                {plan.price}<span className="text-lg font-medium">{plan.period}</span>
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
            </div>
        </div>
    );
};

export default PricingComparison;