import { useMemo } from "react";

export const pricesFeatures = [
	{
		title: "Freemium",
		slug: "freemium",
		description: "Ideal para probar el sistema.",
		price: "Gratis",
		yearlyPrice: "Gratis",
		period: "/mes",
		features: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
		buttonText: "Probar Gratis",
	},
	{
		title: "Básico",
		slug: "basico",
		description: "Ideal para pequeños negocios.",
		price: "$2 CLP",
		yearlyPrice: "$20 CLP",
		period: "/mes",
		features: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
		buttonText: "Elegir Plan",
	},
	{
		title: "Silver",
		slug: "silver",
		description: "Perfecto para negocios medianos.",
		price: "$1 CLP",
		yearlyPrice: "$10 CLP",
		period: "/mes",
		features: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
		buttonText: "Elegir Plan",
	},
	{
		title: "Gold",
		slug: "gold",
		description: "Diseñado para grandes organizaciones.",
		price: "$1 CLP",
		yearlyPrice: "$10 CLP",
		period: "/mes",
		features: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
		buttonText: "Elegir Plan",
	},
];

export function usePricesList() {
	return useMemo(
		() => ({
			pricesFeatures,
		}),
		[]
	);
}
