import { Link } from 'react-router-dom';
import HelmetHelper from '../../../hooks/HelmetHelper/HelmetHelper';
import Faq from '../../../Components/Default/FAQ/Faq';

const FaqPage = () => {
    return(
    <>
        <HelmetHelper path="/faq"/>
        <div className='flex flex-col w-full h-full'>
            <section className='w-full py-12'>
                <div className='mt-12 container mx-auto px-4 md:px-6'>
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="flex mb-2 justify-center">
                            <div className="w-2 h-10 bg-reyes-light mr-4"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                                Preguntas Frecuentes
                            </h2>
                        </div>
                        <p className="text-center text-gray-600 max-w-2xl">
                            Aquí encontrarás respuestas a las preguntas más comunes sobre TurnoMaster. Si no encuentras lo que buscas, no dudes en ponerte en contacto con nosotros.
                        </p>
                    </div>
                </div>
                <div className='space-y-4'>
                    <Faq />
                </div>

                <div className='flex flex-col items-center mt-12 space-y-6'>
                    <div className="flex flex-col justify-center items-center space-y-4">
                        <div className="flex mb-2 justify-center">
                            <div className="w-2 h-10 bg-reyes-light mr-4"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                                ¿Tienes otra duda?
                            </h2>
                        </div>
                        <p className="text-center text-gray-600 max-w-2xl">
                            Puedes ponerte en contacto con nuestro equipo de soporte a través del siguiente enlace. Estaremos encantados de ayudarte.
                        </p>
                    </div>
                    <Link to='/contact' className='bg-reyes-light hover:bg-reyes-light-active text-white px-6 py-3 shadow-lg transition duration-300'>
                        Contactar Soporte
                    </Link>
                </div>

            </section>
        </div>
    </>
    )
};

export default FaqPage;
