import React, { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import HelmetHelper from "../../../hooks/HelmetHelper/HelmetHelper";
import { Link } from "react-router-dom";
import { usePricesList } from "./usePricesList";


const PricingComparison: React.FC = () => {
    const { pricesFeatures } = usePricesList();
    const [isYearly, setIsYearly] = useState(false);

    const togglePricing = () => setIsYearly(!isYearly);

    const allFeatures: string[] = Array.from(
        new Set(
            pricesFeatures.reduce<string[]>((acc, plan: {
                title: string;
                slug: string;
                description: string;
                price: string;
                yearlyPrice: string;
                period: string;
                features: string[];
                buttonText: string;
            }) => acc.concat(plan.features), [])
        )
    );

    return (
    <>
        <HelmetHelper path="/prices" />
        <div className="flex flex-col w-full h-full">
            <section className="w-full py-12">
                <div className="mt-12 container mx-auto px-4 md:px-6">
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="flex mb-2 justify-center">
                            <div className="w-2 h-10 bg-[#e01d1d] mr-4"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                                Planes y Precios de TurnoMaster
                            </h2>
                        </div>
                        <p className="text-center text-gray-600 max-w-2xl">
                            Elige el plan que mejor se adapte a tu negocio y disfruta de todas las funcionalidades que TurnoMaster tiene para ofrecerte.
                        </p>
                    </div>
                    <div className="mt-10 flex flex-col md:flex-row justify-center items-center">
                        {pricesFeatures.map((plan) => (
                            <div key={plan.slug} className="bg-white shadow-md p-6 m-4 w-full max-w-sm">
                                <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
                                <p className="text-gray-600">{plan.description}</p>
                                <p className="text-2xl font-bold text-gray-900 mt-4">{isYearly ? plan.yearlyPrice : plan.price}</p>
                                <Link to={`/product/${plan.slug}`}>
                                    <button className="mt-4 bg-[#e01d1d] text-white py-2 px-4 hover:bg-[#a91a1a] transition-colors">
                                        {plan.buttonText}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                            Comparativa de Funcionalidades
                        </h2>
                    </div>

                    <div className="mt-10 overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b"></th>
                                    {pricesFeatures.map((plan) => (
                                        <th key={plan.slug} className="px-4 py-2 border-b text-center font-semibold">
                                            {plan.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {allFeatures.map((feature, idx) => (
                                    <tr key={feature}>
                                        <td className="px-4 py-2 border-b">{feature}</td>
                                        {pricesFeatures.map((plan) => {
                                            const planFeature = plan.features.find(f => f === feature);
                                            const isNegative = feature.trim().toLowerCase().startsWith("sin");
                                            return (
                                                <td key={plan.slug + idx} className="px-4 py-2 border-b text-center">
                                                    {planFeature ? (
                                                        isNegative ? (
                                                            <FaXmark className="text-red-500 inline" />
                                                        ) : (
                                                            <FaCheck className="text-green-500 inline" />
                                                        )
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}

                                <tr>
                                    <td className="px-4 py-2 font-bold">Precio</td>
                                    {pricesFeatures.map((plan) => (
                                        <td key={plan.slug + "-price"} className="px-4 py-2 text-center font-bold">
                                            {isYearly ? plan.yearlyPrice : plan.price}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-center mt-4">
                            <button
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
                                onClick={togglePricing}
                            >
                                {isYearly ? "Ver precios mensuales" : "Ver precios anuales"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
    );
};

export default PricingComparison;