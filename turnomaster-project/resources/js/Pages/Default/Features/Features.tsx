import { useGetFeatures } from './useGetFeatures';
import HelmetHelper from '../../../hooks/HelmetHelper/HelmetHelper';

const Features = () => {
  const features = useGetFeatures();

  return (
    <>
      <HelmetHelper path="/features" />
      <div className="min-h-screen py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">Características del Proyecto</h1>
          <p className="text-lg text-gray-600 mb-12">
            Descubre las funcionalidades más destacadas que hacen de TurnoMaster una solución poderosa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 text-center"
              >
                {feature.icon}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h2>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
