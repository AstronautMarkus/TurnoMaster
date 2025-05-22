import { useParams, Link } from "react-router-dom";
import { pricesFeatures } from "../Prices/usePricesList";
import HelmetHelper from "../../../hooks/HelmetHelper/HelmetHelper";

const Product = () => {
    const { slug } = useParams<{ slug: string }>();
    const product = pricesFeatures.find((plan) => plan.slug === slug);

    if (!product) {
        return (
            <>
                <HelmetHelper path="/notfound" />
                <div className="min-h-screen flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-red-500">Error: Producto no encontrado</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <HelmetHelper path="/product/" />
            <div className="min-h-screen py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                </div>
            </div>
        </>
    );
};

export default Product;
