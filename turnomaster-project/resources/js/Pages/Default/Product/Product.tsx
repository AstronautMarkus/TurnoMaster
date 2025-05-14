import { useParams, Link } from "react-router-dom";
import { pricesFeatures } from "../Prices/prices_list";
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
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600 mt-4">{product.description}</p>
                    <p className="text-4xl font-bold mt-6">{product.price}</p>
                    <p className="text-sm text-gray-400">{product.period}</p>
                    <ul className="mt-8 text-left space-y-2">
                        {product.features.map((feature, index) => (
                            <li key={index} className="text-gray-600">- {feature}</li>
                        ))}
                    </ul>
                    <Link
                        to={`/product/${product.slug}`}
                        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {product.buttonText}
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Product;
